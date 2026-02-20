---
description: "Language-agnostic programming environments hinder automated parallelization and distribution, often forcing developers that deal with large datasets to manually rewrite programs and their components in languages that support these features. We have built a series of systems that accelerate, parallelize, distribute, and scale out computations fully automatically — while maintaining key correctness and security guarantees. Our systems target widely used environments — e.g., JavaScript, Python, the Shell — and are offered by open-source consortia such as the Linux Foundation. Examples: NSDI'23, OSDI'22, EuroSys'21."
type: "project"
date: 2021-03-06
---

## Acceleration and Scaleout of Software Systems

Shell scripting is used pervasively, partly due to its simplicity in combining components (commands) written in multiple languages. Unfortunately, this language-agnostic composition hinders automated parallelization and distribution, often forcing developers to manually rewrite shell programs (and their components) in other languages that support these features. We have built several systems that, combined, offer automated parallelization of Unix/Linux shell scripts—along with serious correctness and compatibility guarantees.

**Papers:** Our [HotOS15 paper](http://nikos.vasilak.is/p/m31:hotos:2015.pdf) identifies the composition problem with today's distributed computing software — that there's no equivalent of an elegant and simple composition in modern distributed environments— and offers a vision for the future. Our [EuroSys21 paper](http://nikos.vasilak.is/p/pash:eurosys:2021.pdf) describes our PaSh system for parallelizing shell pipelines, and the corresponding [ICFP21 paper](http://nikos.vasilak.is/p/pash:icfp:2021.pdf) formalizes the model at the core of PaSh and proves its parallelizing transformations correct. Our [HotOS21 paper](http://nikos.vasilak.is/p/pash:hotos:2021.pdf) outlines a vision for the future of the shell, and our [HotOS21 panel](http://nikos.vasilak.is/p/shellpanel:hotos:2021.pdf) discusses future avenues for [cross-discipline shell-related research](https://arxiv.org/abs/2109.11016).

Our recent [OSDI22 paper](http://nikos.vasilak.is/p/pash:osdi:2022.pdf) tackles POSIX-compliant parallelization in the presence of fully dynamic behavior pervasive in the shell—via just-in-time compilation, intermixing evaluation and optimization of individual expressions. Our [NSDI23 paper](http://nikos.vasilak.is/p/pash:nsdi:2023.pdf) takes this to the distributed level, by offering automated POSIX-compliant scale-out across multiple computers. And our [HotOS23 paper](http://nikos.vasilak.is/p/hs:hotos:2023.pdf) identifies speculative out-of-order shell-script execution as a key challenge — and sketches appropriate containment mechanisms that can be used to delay and reorder side effects.

**Ongoing work:** Ongoing research (1) develops an out-of-order execution engine for shell scripts, (2) proposes  tackles automated generation of critical runtime components, through a combination of [active learning and program synthesis](http://nikos.vasilak.is/p/kumquat:arxiv:2021.pdf), (3) proposes appropriate fault-tolerance support for distributed shell-script execution, and (4) develops appropriate type systems, formal models, and mathematical proofs targeting environments that support the composition of black-box software components.

**Software:**

* [PaSh](https://github.com/binpash) is an award-winning just-in-time parallelization system that forms the basis for all our shell-related research. 
* [DiSh](https://github.com/binpash/dish) is a system for automatically scaling out shell scripts to multiple computers.
* The [try](https://github.com/binpash/try) tool allows users to run a command and inspect its effects ahead of time.

**Technology transition:**

Our PaSh open-source work has joined and is available by [the Linux Foundation](https://www.linuxfoundation.org/) and our try open-source primitive has received significant (over [5K GitHub stars](https://github.com/binpash/try)).

**Press:**



* [MIT News article](https://news.mit.edu/2022/faster-unix-computing-program-0607) on faster computing results without fear of errors
* [Press release](https://www.linuxfoundation.org/press/press-release/linux-foundation-to-host-the-pash-project-accelerating-shell-scripting-with-automated-parallelization-for-industrial-use-cases) from the Linux Foundation
* Many discussions and third-party tutorials on PaSh and Try — e.g., [ycombinator](https://news.ycombinator.com/item?id=36461102), [i-programmer](https://www.i-programmer.info/news/90-tools/14990-the-pash-project-advancing-the-unix-philosophy-one-step-further.html), [medium](https://sarvsav.medium.com/shell-dry-run-for-your-commands-f5dba65d20b1), etc.
