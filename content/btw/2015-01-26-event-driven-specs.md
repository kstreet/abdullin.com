---
date: 2015-01-26
title: Event-driven specs
tags:
- event-driven
- gtd
- design
- ddd
form: story
story: btw
storyIndex: 20150126
---

Last week I continued working on the back-end API server for _Getting
Things Done_ task-manager.


> GTD domain is something we explored for some time with
> [Kerry Street](https://twitter/kcstreet) in
> [BeingTheWorst Podcast](http://beingtheworst.com). This project is a
> continuation of that journey but with the things learned recently
> from the [HPC](/happypancake/) project and DDD community.

## Use-Cases

Specification micro-framework seems to be stable now. I wrote it from
scratch, while bearing in mind the limitations and issues we
discovered in previous event-driven project.

That is how single API use-case looks like:
```go
func given_unchecked_task_when_check_then_event() *env.UseCase {

    taskId := lang.NewTaskId()

    return &env.UseCase{
        Name: "Given new task, when PUT /task with check, then event",
        Given: spec.Events(
            lang.NewTaskAdded(newEventId(), taskId, "ho-ho"),
        ),
        When: spec.PutJSON("/task", seq.Map{
            "checked": true,
            "taskId":  taskId,
        }),
        ThenResponse: spec.ReturnJSON(seq.Map{
            "taskId":  taskId,
            "name":    "ho-ho",
            "checked": true,
        }),
        ThenEvents: spec.Events(
            lang.NewTaskChecked(IgnoreEventId, taskId),
        ),
        Where: spec.Where{IgnoreEventId: "ignore"},
    }
}

```

Such use-cases focus on a single specific task: they **describe
behavior of a module in a declarative way via its public contract**:

* consumed and published events;
* RPC API requests and responses.

As such, these are not exactly unit-tests or integration tests. They
have some nice properties when applied with the event-driven design
process. I'll talk about that later.

> Other applications for these use-cases are: printing human-readable
> API usage stories to impress managers, generating detailed
> up-to-date API documentation to impress developers, generating
> system dependency diagrams to scare managers and generating
> realistic load-tests to stress the heck out of hardware and impress
> DevOps people.

## Partial Responses

While implementing use-case library, the trickiest part was to figure
out how to test only partial responses.

For example, an API call might be returning a large task object,
however in a specific use-case only three specific fields would be
relevant. We would want to test them and ignore the rest of the object.

At this point I solved the problem by constructing response objects
from maps by hand and comparing them with the actual response.

```go
ThenResponse: spec.ReturnJSON(seq.Map{
    "taskId":  taskId,
    "name":    "ho-ho",
    "checked": true,
}),
```

> Of course, one could pass directly a strongly-typed response object
> instead of a weakly-typed map. That would defeat the whole purpose
> of API tests, though. We want to test actual responses.

The same approach applies to events that we expect and actually get.

## Verifying Use-Cases

Verifying behavior of an application in a clear and non-fragile way -
is the primary field of application for these use-cases. I implemented
a simple verification utility, which plugs into the unit-testing
pipeline of Go. It runs all tests, printing a detailed information for
each failure.

> Behind the scenes, verification runner loads a module into memory,
> wiring it to the real http server and in-memory event bus. After
> dispatching events and performing http requests, outputs are
> compared with expectations.

```text
✗ Given new task, when PUT /task with check, then event

Given_events:
1. TaskAdded {
  "eventId": "13bcdee63b9888cb0000000300886534",
  "taskId": "13bcdee63b9887dc0000000200886534",
  "name": "ho-ho"
}
When_request: PUT /task
Expect_HTTP: 200 {
  "checked": true,
  "name": "ho-ho",
  "starred": false,
  "taskId": "13bcdee63b9887dc0000000200886534"
}
Actual_HTTP: 500 {
  "error": "Not implemented"
}
Expect_Events: 1
0. TaskChecked {
  "eventId": "",
  "taskId": "13bcdee63b9887dc0000000200886534"
}
```

Manually comparing expected and actual responses can be
counter-productive. It might be better to work with a clear list of
issues, fixing them one by one. Use-case verifier now does exactly
that:


```text
Issues_to_fix:
1. Expected 'Body.checked' to be 'true' but got 'nothing'
2. Expected 'Body.name' to be 'ho-ho' but got 'nothing'
3. Expected 'Body.starred' to be 'false' but got 'nothing'
4. Expected 'Body.taskId' to be '13bcdee63b9887dc0000000200886534' but got 'nothing'
5. Expected 'Status' to be '200' but got '500'
6. Expected 'Events.length' to be '1' but got '0'
7. Expected 'Events[0].$contract' to be 'TaskChecked' but got 'nothing'
8. Expected 'Events[0].taskId' to be '13bcdee63b9887dc0000000200886534' but got 'nothing'
```

## Productivity

Golang compiler can build sources and run tests in milliseconds. The
rest of tooling is comparably fast as well. We could even perform all
these operations almost instantaneously:

* reformat code
* save file
* perform static code analysis for common issues
* build
* run unit tests and verify use-cases

In fact, I configured `F2` to perform all these operations in sequence
on single a key-press. This makes the process of implementing API
logic rather simple:

1. Pick the next issue in the `Issues_to_fix` list.
2. Type a few lines of code.
3. Hit `F2`.
4. Verify that the issue is gone, then go to 1.

> If I were doing that with .NET and MSBuild, then I'd need to insert
> "Take a break" between 3 and 4.

## Next Steps

This API back-end is going to provide persistence and scalability to
Flux/React.JS front-end, which I'm building in parallel (currently
front-end uses in-memory storage). So my next steps would be:

1. Implement all API features needed to wire front-end to back-end.
2. Implement _Projects_ and _Contexts_.
3. Add some persistence to the back-end.
