---
aliases:
- /event-sourcing/aggregates
date: 2011-09-26
tags:
- xLim
- DDD
- CQRS
- Domain Event
- popular
title: Event Sourcing - Aggregates
---
A quick way to understand aggregates that use event sourcing is to consider the following analogy.

Imagine a car parts factory that is being managed by a director. This director *commands* this factory by sending instructions from his office down to the production floor. These instructions could be:

* recalibrate all machines;
* make that guy work 16 hours tomorrow;
* ship order to customer A. Now!

Each *command* is carried over to the plant and executed by workers (as diligently as possible). As this happens, papers and memos are filled (since we need to inform the headquarters about what has really happened). So each of these commands can have various outcomes, which depend on the *current state* of the plant. 

For example, when we send command to _recalibrate all machines`, we can get response that `all 10 machines were re-calibrated`. Another response could be `5 machines were re-calibrated, 3 were found to be broken and 2 were actually found to be missing`.

Same with the other commands. When we try to make a worker work 16 hours he might agree or (if he is a Russian), he could just say some rich and powerful words to the management.

When we are trying to ship all orders, one of the following sequence of _events_ might happen:

* _given_ that all order items are prepared - orders get shipped;
* _given_ that some items are missing but can be replaced with equivalent parts - order gets shipped with some replaced parts and then also record about that replacement.
* _given_ that order can't be fixed by replacing certain items - an apology gets written.

Let's bring in the analogies between an aggregate root and a factory:

* _factory_ - _aggregate_;
* _command_ to factory - _command_;
* _given_ _state_ of a factory - an internal _aggregate state_;
* occurrence of some _event_ - _event_;

Let's implement aggregate for this factory without using any external frameworks. First we start by defining interfaces for our elements: event, command, state and aggregate.

    public interface IEvent {}

Then, we define contracts for our events (I'm using a <a href="http://code.google.com/p/lokad-message-contracts-dsl-sample/" target="_blank" class="offsite-link-inline">VS T4+ANTRL Combo</a> here to avoid writing message contract classes by hand or bloating this post). 

Events would look like this:

    MachineRecalibrated : IEvent (Guid factory, int machineId, DateTime calibrationDate, double accuracy)
    MachineReportedStolen : IEvent (Guid factory, int machineId, Guid policeReportNumber)
    MachineReportedBroken : IEvent (Guid factory, int machineId, Guid incidentReportId)
    
    OrderShipped : IEvent(Guid factory, int orderId, ShippingReport report)
    OrderCantBeShipped : IEvent (Guid factory, int orderId, ShipDenialReport report)

    WorkerWorkShiftExtended(Guid factory, int workerId, int hours)
    WorkerUsedRussianCurses(Guid factory, int workerId, string message)
    WorkerRefusedToExtendShift(Guid factory, int workerId)

Given these events, let's start by implementing an aggregate called `FactoryAggregate`. In the following method we hold all behaviors required to *recalibrate all factory machines*. Note, that here we are taking a dependency on `IServiceGuy`.

    public void RecalibrateAllMachines(IServiceGuy guy)
    {
      var id = _state.FactoryId;
      foreach (var machine in _state.Machines)
      {
        var report = guy.RecalibrateMachine(machine);
          
        switch (report.State)
        {
          case CalibrationReport.Missing:
            Apply(new MachineReportedStolen(id, machine.Id, report.Id));
            break;
          case CalibrationReport.Broken:
            Apply(new MachineReportedBroken(id, machine.Id, report.Id));
            break;
          case CalibrationReport.Recalibrated:
            Apply(new MachineRecalibrated(id, machine.Id, report.Date, report.Accuracy));
            break;
          default:
            throw new UnsupportedReport(report);
            break;
        }
      }
    }
  
Here is how another method can be implemented:

    public void MakeWorkerPullLongShift(int workerId, int hours, IRussianCurseGenerator gen)
    {
      var worker = _state.GetWorker(workerId);

      if (worker.AgreesToPullHours(hours))
      {
        Apply(new WorkerWorkShiftExtended(_state.FactoryId, workerId, hours));
      }
      else
      {
        Apply(new WorkerRefusedToExtendShift(_state.FactoryId, workerId));
      }

      if (worker.IsEnraged && worker.IsRussian) 
      {
        var curses = get.GenerateCurses(worker.RageLevel);
        Apply(new WorkerSentMessageToManagement(_state.FactoryId, workerId, curses));
        return;   
      }
    }

So far all is straightforward. But we have 2 unknown items here - `_state` and `Apply`.

These are two sides of the same coin here. `_state` reflects the current state of things on the factory right now. `Apply` is used to publish events while also updating this official state of things.

    // private variable that holds an observer delegate
    readonly Action<IEvent> _addToUnitOfWork;      

    void Apply(IEvent event)
    {
      // Pass the event to state (and let it update itself)
      _state.Apply(event);
      // Add event to the unit of work
      _addToUnitOfWork(event);
    }

Then, we proceed to write the aggregate state. It should know, how to apply given events.

    public sealed class FactoryState
    {
      public void Apply(IEvent @event)
      {
        RedirectToWhen.InvokeEvent(this, @event);
      }

      public MachineList _machines;
      public MachineList _brokenMachines;

      public void When(MachineAdded e)
      {
        _machines.AddNew(e.Id, e.InitialCalibrationDate, e.InitialAccuracy);
      }
      public void When(MachineReportedStolen e)
      {
        _machines.Remove(e.MachineId);
      }
      public void When(MachineReportedBroken e)
      {
        var m = _machines[e.MachineId];
        _brokenMachines.Add(m);
        _machines.Remove(m);
      }
      public void When(MachineRecalibrated e)
      {
        var m = _machines[e.MachineId];
        m.CalibrationDate = e.CalibrationDate;
        m.Accuracy = e.Accuracy;
      }

The only "magical" place here is the RedirectToWhen helper, which is actually quite simple (<a href="https://gist.github.com/1047419">see gist</a>).

As you can see, commands are executed against the aggregate. If needed, aggregate uses additional services. While executing commands, aggregate employs complex behaviors which are based on the current state. This execution results in changes to the state, which are expressed as events.

## Event Sourcing Magic

Let's see how all these come together in a message handler that accepts command messages and passes them to the aggregate store.

    public void Consume(RecalibrateAllMachines cmd)
    {
      var guy = _container.Resolve<IServiceGuy>();
      _factoryRepository.Execute(cmd.FactoryId, c =>
      {
        c.RecalibrateAllMachines(guy);
      });
    }

    public void Consume(MakeWorkerPullLongShift cmd)
    {
      var generator = _container.Resolve<IRussianCurseGenerator>();
      _factoryRepository.Execute(cmd.FactoryId, c =>
      {
        c.MakeWorkerPullLongShift(cmd.WorkerId, cmd.Hours, generator);
      });
    }

Having said all that, here's how the "event sourcing magic" actually works:

    public void Execute(int id, Action<FactoryAggregate> when)
    {
      var streamName = "factory-" + id;
      var given = _stream.ReadAllEvents(streamName);
      // load state from the event history
      // or, if you have snapshot - load it here first
      // we will not do the latter here
      var state = new FactoryState();
      foreach (var e in givenEvents)
      {
        state.Apply(e);
      }    
      var thenEvents = new List<IEvent>();
      var ar = new FactoryAggregate(thenEvents.Add, cs);
      // execute actual command
      when(ar);
      // do something with the events that were produced.
      // for example - append them to the history and then 
      // publish in async or do both at once and face 2PC
      _stream.AppendEvents(streamName, thenEvents);

    }

    IEnumerable<IEvent> givenEvents = ...;
    

That's, basically, it. Note, that we are not relying on any frameworks, code or interface definitions outside the scope of this article.  A few caveats:

* aggregate identities are carried outside of the commands/events and passed by the message bus via strongly-typed message contexts (see <a href="http://code.google.com/p/lokad-cqrs/downloads/list" target="_blank" class="offsite-link-inline">Lokad CQRS PDF</a> for detail). Aggregates don't care about their own identity.
* versioning and version checks are not within the scope of this article, yet they could be added to the snippet above as needed.
* all commands that come in, are joined by a logical transaction; obviously your message bus must support command batching in order for this to work.

## How is Aggregate Created?

Event Stream for an aggregate is created by sending a command to the aggregate that does not exist. This command could look like:

    new CreateUserCommand {
        Id = Guid.NewGuid(),
        Name = registerModel.Name,
        Login = registerModel.Login,
        Password = registerModel.Password
    }

Then, somewhere in the handler we could have:

    public void Consume(CreateUserCommand cmd)
    {
      var service = _container.Resolve<EmailCheckService>();      
      _factoryRepository.CreateAndExecute(cmd.Id, c =>
      {
        c.CreateNewUser(cmd.Id, cmd.Name, cmd.Login, cmd.Password, service);
      });
    }

The only difference between `Execute` and `CreateAndExecute` methods is that the latter does not throw any exceptions if the stream does not exist before the call (and it might actually throw an exception if the stream *did* exist).

> Note, that in the advanced cases of user registrations we might want to start by creating a `RegistrationAggregate` (to track all associated information and the actual process of registration), that would then pass control to various instances of `CustomerAggregate`, `SecurityAccountAggregate` and `UserLoginAggregate`. These details depend on your domain and are subject to discussion with domain experts.

## Advanced Scenarios

Above is a simplified approach to event sourcing that is generally described and explained in articles on the subject.   However, there are ways to reduce development friction and increase expressiveness of the code, if [Event centric approach a la Lokad](/event-centric/) is used.

There the situation gets even more interesting if we assume that:

* all messages (commands and events alike) carry unique identifier that is used at all steps of message processing to enforce message de-duplication (required for repartitioning or cloud environment in general).
* entity identities (i.e.: aggregate root identifiers) that are carried in the transport headers, not only simplify our contracts (while still being exposed to the domain code in a decoupled way), but also provide simple foundation for message routing and aggregate re-partitioning.
* if we keep track of the message causality (event X was caused by command batch Y) in the transport headers along with client vectors, this provides us with the foundation to do partial message ordering (for the cases where cloud environments are really stressed and tend to mess up order a lot).

This topic is continued in the post on [Tape Storage](http://abdullin.com/journal/2011/7/4/tape-storage-in-lokadcqrs-for-event-sourcing.html), which serves as persistence foundation for event sourcing and also enable fully portable systems to be [developed and deployed with Lokad.CQRS](http://abdullin.com/journal/2011/7/4/fully-portable-scenario-in-lokadcqrs.html).

## Message Builders

Sometimes our messages will be so large, that composing them via constructors would create fragile and non-readable code. If such an instantiation happens too often for a single event, we can improve code readability in this specific case by introducing event builders.

Event builder is a statefull class, which provides helpful and expressive syntax to create an instance of an event.

It can look as simple as this:

> // TODO: add a snippet
