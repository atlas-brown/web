---
description: "Recent trends are pushing developers towards new paradigms of secure and scalable computing—e.g., confidential computing, microservices, serverless computing, and edge computing. Transforming a conventional program to leverage these paradigms is a laborious manual process that can lead to suboptimal performance and in many cases even break the program. We are developing systems that support this kind of decomposition and leveraging special hardware capabilities when these are available in the network. Examples: ARES'22, PLDI'19, ATC'19."
type: "project"
date: 2022-03-06
---


## Towards Secure Scalable Computing

Recent trends are pushing developers towards new paradigms of secure and scalable computing—_e.g._, confidential computing, microservices, serverless computing, edge computing, _etc_. Transforming a conventional program to leverage these paradigms is a laborious manual process that can lead to suboptimal performance and in many cases even break the program. We are developing systems supporting this kind of decomposition, often exploiting special hardware capabilities when these are possible.


**Papers:** Our [PLDI19 paper](http://nikos.vasilak.is/p/ignis:pldi:2019.pdf) presents a module-level decomposition, resource awareness, and scale-out of bottlenecked components. Our [ARES22 paper](https://nikos.vasilak.is/p/themis:ares:2022.pdf) introduces a new approach for secure decentralized communication in microservice and serverless computing. Our [APNet19](http://nikos.vasilak.is/p/tmc:apnet:2019.pdf), [EdgeSys18](http://nikos.vasilak.is/p/ar:edgesys:2018.pdf), and [APSys17](https://nikos.vasilak.is/p/uni:apsys:2017.pdf) papers sketch several components of and extensions to this broader vision.


**Ongoing work:** Our current work tackles (1) automated application decomposition of monolithic applications towards confidential computing, including on Intel SGX, (2) automated to-serverless compilation of programs that use many black-box software components and language-agnostic composition, (3) distributed performance profiling in the context of microservice applications, and (4) automated decomposition of monolithic applications towards microservice and serverless computing.


**Software:**

* [Atlas](https://github.com/atlas-runtime) is a new runtime environment that supports seamless offloading and scale-out, including over Trusted Execution Environments such as Intel SGX.
* [Themis](https://github.com/atlas-runtime/themis) is a library for secure and scalable communication in the context of microservices and serverless computing.