---
title: "Go: The Good Parts"
date: 2014-12-02
tags:
- golang
idea: Go is an opinionated language from Google.
aliases:
- /journal/2013/12/16/studying-go-language-golang.html/index.html
- /post/studying-go-language-golang/
form: essay
---

Go is an opinionated programming language initially developed by
Google in 2007. It is a *statically typed language with a simple
syntax*, resembling C or JavaScript. It features garbage collection,
type safety and large standard library.

Go can be statically compiled into a single executable binary,
which could target a large number of operating systems (from Linux and
Windows to Plan 9) and processors (i386, amd64 and ARM).


> In [HappyPancake project](http://abdullin.com/long/happypancake/) we
> found that Golang was a good fit for developing event-driven backend
> services. Other contenders included Scala, C#, Haskell and Erlang.

Here is how code can look like in Golang:

!! include example golang__sample

## Good parts

* Concise and simple syntax, easy to get started with.
* Good facilities for writing concurrent programs that share state by
  communicating (goroutines and channels).
* Good ecosystem for developing backend servers, all major drivers and
  libraries are generally available.
* Decent integration story with native code.
* Lightweight development stack with major IDE-like features provided
  by command-line tools (and available in different editors).
* Unified formatting style for the language, provided by `gofmt`.
* Compilation is fast even with large projects.
* Go supports all major OSes and CPU architectures.
* Lightweight type system with interfaces "by example" and type
embedding.

As a new language, Go attracts a lot of talent and interested
developers. There are some interesting projects taking place in this
ecosystem.

## Opinionated parts

Golang is an opinionated language which started as an experiment. Some
of its design decisions can take time to get used to. This especially
applies to developers with a strong background in Object-Oriented
Programming.

Yet, these opinionated decisions ultimately add to the strengths of
the language.

### Focused Packages

Golang ecosystem encourages separation of code into compact cohesive
modules which do one thing and do it well: _packages_. It is common to
have packages with only one or two files.

> This way of structuring applications follows the Unix way of
> building software. It also aligns well with micro-services architecture.

This approach might feel foreign for people coming from ecosystems
which favor larger modules (e.g. projects in .NET). Yet it leads to
code that is more simple and reusable.

### Type System

Type system in golang is an opinionated one. It includes following
features:

* Data types in form of structs (plain DTOs).
* Embedding types in each other.
* Functions and methods (functions with a receiver for dot syntax:
  `response.Render()`).
* Implicit interfaces "by example" (types implement interfaces by
  providing methods with matching signatures).
* Lack of generics.

Go is unique in the way methods, interfaces, and embedded types work
together.

## Not so good parts

* You must set and tweak `GOMAXPROCS` variable for each program which
  needs parallel execution.
* You can build web applications and native UIs with Golang, but
  ecosystem there is rather immature, if compared to the other
  platforms.
* Ecosystem can be lacking in unexpected places. For example we had to
  deal with shortcoming of default SQL layer and patch PostgreSQL
  drivers.
* Debugging golang code is neither easy nor reliable.
* Golang has prominent explicit error handling style; if followed
  blindly, it can turn code into a spaghetti of error checks.
* Golang stores all dependencies as folders in `GOPATH`,
  e.g. `abdullin/chk`. Having a single global workspace makes things
  tricky, when you need to work with multiple versions of a library.

> This is the state of Golang at the moment of writing. Things will
> improve over time.

## More Examples

This is an example of a simple web server in go. It maintains a list
of accepted jobs, which are served for `GET` requests.

You can `POST` new jobs to the server. It will process them
asynchronously, adding to the list.

> We coded this example with Tom Janssens while working on
> [Happy Pancake](/long/happypancake) project. Neither of us had any
> prior knowledge of go.

!! include example go__http

## Summary

I think, Golang is a great language for building fast back-end
servers or utilities that work across operating systems.

Ecosystem and tooling around golang are young. This attracts some
talent but might create additional problems for certain projects.

## References

1. [An introduction to programming in Go](http://www.golang-book.com/assets/pdf/gobook.pdf)
2. [Effective Go](http://golang.org/doc/effective_go.html)
3. [A Tour of Go](http://tour.golang.org/)
4. [Docker and Go: why did we decide to write Docker in Go?](http://www.slideshare.net/jpetazzo/docker-and-go-why-did-we-decide-to-write-docker-in-go)
   (Slides)
5. [SO Post : Erlang vs Go](http://stackoverflow.com/questions/9339560/erlang-versus-go-versus-rust-comparison)
6. [Video on concurrency patterns / principles](http://www.youtube.com/watch?v=f6kdp27TYZs)
