---
title: Command-Query Separation
idea: Methods should either change state or return answer, but not both.
date: 2014-12-01
tags:
- design
- patterns
- golang
form: essay
aliases:
- /essay/cqs/
---

// idea: introduce command-query separation

Command-query separation (or CQS for short) is a design principle
devised by Bertrand Meyer. CQS states that every method should either
be a _command_ that performs an action (changes state), or a _query_
that returns answer to the caller (without changing the state or
causing side-effects), but not both.

// TODO: add a ref to Bertrand Meyer

// idea: explain cqs in other words

In other words, functions should return a value only if they are pure
(don't make any visible state changes). This convention, if followed
consistently, can simplify programs, making them easier to understand
and reason about.

// TODO: too abrupt transition to the next paragraph, the transition
// should be smoother - probably with a parenthetical phrase.

// idea: provide a counter-example of cqs

Following method violates CQS principle, it does too much:

!! include example cqs__bad


// idea: show how we can improve bad example

We can simplify this code by breaking it into two
methods. *Command*:

!! include example cqs__command

and *query*:

!! include example cqs__query

We can reuse and test these methods separately or compose
them. For example, to print validation errors:

!! include example cqs__refactored-validation

Saving user while safe-guarding against invalid input:

!! include example cqs__refactored-save

> Following CQS principle is a good guideline for a project coding
> style. However, it might be unfeasible to follow it
> everywhere. Instead, we could be consistent within a context. For
> example: accept that UI is messy but keep backend clean.


## Exceptions

// idea: in some cases cqs is not the best fit

CQS works best when it we treat it as a design principle. If used
consistently, it helps people understand code better and faster.

Yet, there always are exceptional edge cases, where it could be
wise to step away from such principle:

* Operations related to concurrency, where it is important to both
  mutate state and get the result back: `Interlocked.Increment` or
  `sync.Add`.

* Well-established data structures, where functions with result and
  side-effect are common: `queue.Dequeue` or `Stack.Pop`

It is possible to modify all of these methods to follow CQS
principle. Yet, that would introduce additional complexity and deviate
from the expected behavior.

It might be better to accept the deviation and note it explicitly
(e.g. in documentation, inline comments or method names).

## CQS in Languages

// gist: functional languages enforce CQS principle

CQS is prominent in _Functional Programming_. Languages supporting
it often have this principle baked right into the language design itself.

// TODO: provide examples in Haskell maybe

> Haskell and F# emphasize functional programming. Learning them
>would be a good exercise and can make you a better developer.

// TODO: change the sentence above to something less boring, more witty.

// idea: following CQS in OOP languages makes code more simple

Languages following _Object-Oriented Programming_ approach don't enforce
CQS by default. Yet, following these principles can lead to simpler code
that is more predictable and easy to reason about.

Some ecosystems offer additional tooling to make CQS principle more
explicit to the developers.  For example, Microsoft Code Contracts
introduces `Pure` Attribute to indicate methods that don't have
visible side effects.

## References

1. [Command-query separation - Wikipedia](http://en.wikipedia.org/wiki/Command–query_separation)
2. [Pure Attribute](http://msdn.microsoft.com/en-us/library/system.diagnostics.contracts.pureattribute.aspx)
