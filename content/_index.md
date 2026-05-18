+++
+++

We build systems that lift the capabilities of programmers dealing with the vast complexity of modern software systems. Our systems automate away inessential complexity and automate in desired features — for example, securing programs that use hundreds of software dependencies, bolting distribution onto existing applications, and parallelizing large-scale pipelines built out of multi-language components. We characterize the behavior of the systems we build using real workloads seen in practice, often paired with mathematical models and proofs of key properties of interest. 

---

## News
{{< news-feed limit="10" >}}

See [all news](./news/)

---

## Research

<img class="imgStuffResearch" src="./supply-chain.jpeg" alt="supply-chain" align="left"/> 

[Automating Protections Against Software Supply-Chain Threats
](./supply-chain/)  
Modern software incorporates thousands of dependencies as a means of accelerating development and reducing cost—risking safety and security for both developers and end-users. We have built a series of systems targeting the JavaScript ecosystem—the largest such ecosystem out there—automating the analysis, transformation, and synthesis of JavaScript dependencies across a variety of threat models. Examples: [AsiaCCS'23](http://nikos.vasilak.is/p/binwrap:asiaccs:2023.pdf), [CCS'21](http://nikos.vasilak.is/p/harp:ccs:2021.pdf), [CCS'21](http://nikos.vasilak.is/p/mir:ccs:2021.pdf).
<div style="clear: both; margin-bottom: 1.5rem;"></div>

<img class="imgStuffResearch" src="./systems.jpg" alt="systems" align="left"/> 

[Automating Acceleration and Scale-out of Software Systems](./acceleration/)  
Language-agnostic programming environments hinder automated parallelization and distribution, often forcing developers to manually rewrite programs and their components in languages that support these features. We have built a series of systems that accelerate, parallelize, distribute, and scale out computations fully automatically---while maintaining key correctness and security guarantees. Our systems target widely used environments---e.g., JavaScript, Python, the Shell---and are offered by open-source consortia such as the Linux Foundation. Examples: [NSDI'23](http://nikos.vasilak.is/p/pash:nsdi:2023.pdf), [OSDI'22](http://nikos.vasilak.is/p/pash:osdi:2022.pdf), [EuroSys'21](http://nikos.vasilak.is/p/pash:eurosys:2021.pdf).
<div style="clear: both; margin-bottom: 1.5rem;"></div>

<img class="imgStuffResearch" src="./microservices.png" alt="microservices" align="left"/> 

[Automated Transformation Towards Secure Scalable Computing Paradigms](./ssc/)  
Recent trends are pushing developers towards new paradigms of secure and scalable computing—e.g., confidential computing, microservices, serverless computing, and edge computing. Transforming a conventional program to leverage these paradigms is a laborious manual process that can lead to suboptimal performance and in many cases even break the program. We are developing systems that support this kind of decomposition and leveraging special hardware capabilities when these are available in the network. Examples: [ARES'22](https://nikos.vasilak.is/p/themis:ares:2022.pdf), [PLDI'19](http://nikos.vasilak.is/p/ignis:pldi:2019.pdf), [ATC'19](http://nikos.vasilak.is/p/finelame:atc:2019.pdf).

<div style="clear: both; margin-bottom: 1.5rem;"></div>

<img class="imgStuffResearch" src="./correctness.jpeg" alt="correctness" align="left"/> 

[Automating Software Correctness](./correctness/)  
Programming correctness in modern software systems is hard to maintain as applications scale across dependencies, languages, and distributed environments. We build systems that automatically enforce, validate, and preserve correctness properties while remaining practical for real workloads. Examples: [HotOS'25](https://nikos.vasilak.is/p/sash:hotos:2025.pdf), [ICFP'21](https://doi.org/10.1145/3473570), [HotOS'23](https://doi.org/10.1145/3593856.3595891), [ARES'22](https://doi.org/10.1145/3538969.3538983), [CCS'21](http://nikos.vasilak.is/p/harp:ccs:2021.pdf).

---

## Team

{{< team-home-members >}}

---

{{< columns >}} <!-- begin columns block -->

## Keep in Touch

[Mailing list](mailto:atlas-brown@googlegroups.com)  
[GitHub organization](https://github.com/atlas-brown)  
[Discord server](https://discord.com/channels/1029481105625186495)  
[Onboarding resources](https://docs.google.com/document/d/e/2PACX-1vQJyX_A3gLGwzmVunmHLfqdAhvbG-VXHkckbW94zy1Db6bvDZ8bwcUkVnnrYRz0RzgjClW9DF1Z_QhX/pub)


[PaSh: Discord server](https://discord.com/channels/947328962739187753)  
[PaSh: Mailing list](https://groups.google.com/g/pash-users)


[Brown systems: Mailing list](https://lists.cs.brown.edu/sympa/rss_request/sysread)


<---> <!-- magic separator, between columns -->

## Courses

[CS1380: Distributed Computer Systems](https://cs.brown.edu/courses/csci1380/)  
[CS2952-R: Systems Transforming Systems](https://cs.brown.edu/courses/csci2952r/)  
[CS2953-A: Engineering Complex Systems with Generative AI](https://cs.brown.edu/courses/csci2953a/)  
[Weekly systems lunch](https://systems.cs.brown.edu/sysread/)

## Others at Brown

Clusters: [Systems](https://systems.cs.brown.edu), [PLT](https://cs.brown.edu/research/plt/), [SSL](https://gitlab.com/brown-ssl), [CEL](https://cel.cs.brown.edu/)  
Organizations: [DSI](https://dsi.brown.edu/), [CCV](https://ccv.brown.edu/)

{{< /columns >}}
