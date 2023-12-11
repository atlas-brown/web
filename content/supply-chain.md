---
description: "Modern software incorporates thousands of dependencies as a means of accelerating development and reducing cost—at a significant risk to safety and security for both developers and end-users. We have built a series of systems targeting the JavaScript ecosystem—the largest such ecosystem out there—automating the analysis, transformation, and synthesis of JavaScript dependencies across a variety of threat models. Examples: AsiaCCS'23, CCS'21, CCS'21."
type: "project"
date: 2023-03-06
---
## Software Supply-Chain Security

Modern software incorporates thousands of dependencies as a means of accelerating its development and reducing its cost—at a significant risk to safety and security for both developers and end-users. We have built a series of systems targeting the JavaScript dependency ecosystem—the largest such ecosystem out there—automating the analysis, transformation, and synthesis of dependencies across a variety of threat models.

**Papers:** Our [PLOS17 paper](http://nikos.vasilak.is/p/breakapp:plos:2017.pdf) identifies key security problems with third-party libraries and sketches a solution that leverages program transformations to lower (and lock) the privilege of individual libraries. Our [NDSS18 paper](http://nikos.vasilak.is/p/breakapp:ndss:2018.pdf) proposes automated transformations that use operating-system protection mechanisms to isolate selected libraries. Our [FSE21 paper](http://nikos.vasilak.is/p/lya:fse:2021.pdf) proposes language-based instrumentation techniques applied to the context around each library to offer low-overhead Turing-complete runtime analysis and isolation. One of our [CCS21 papers](http://nikos.vasilak.is/p/mir:ccs:2021.pdf) proposes a read-write-execute (RWX) permission model at the library boundary, combined with static and load-time program analysis that automates permission inference — minimizing developer effort to secure these libraries. Our other [CCS21 paper](http://nikos.vasilak.is/p/harp:ccs:2021.pdf) uses active learning and regeneration to synthesize vulnerability-free replacement libraries that fall under certain computational domains. 

Our recent systems, presented at [AsiaCCS23](http://nikos.vasilak.is/p/binwrap:asiaccs:2023.pdf) and [ACSAC22](http://nikos.vasilak.is/p/pitchfork:acsac:2022.pdf), protect against memory-unsafe native addons, such as JavaScript or Python libraries developed in C/C++, and offer application-level support for privilege separation. And our [ICSE23 paper](https://nikos.vasilak.is/p/secbench:icse:2023.pdf) proposes a collection of executable security benchmarks that can be used to evaluate defenses against supply-chain security issues.

**Ongoing work:** Our current research (1) develops the model behind library recontextualization and its proofs of soundness properties, (2) proposes the combination of static and dynamic analysis techniques to address accuracy and compatibility challenges in shielding third-party libraries, and (3) advocates the use of Large Language Models (LLMs) to overcome the scalability limitations of vulnerability-free library regeneration.

**Software & Systems:**

* [Lya](http://github.com/andromeda/lya) is a system for dynamic program analysis and instrumentation at the boundaries of JavaScript libraries. It forms the basis for much of our runtime security work around JavaScript. 
* [Mir](http://github.com/andromeda/mir) is a system for static analysis at the boundaries of JavaScript libraries.
* [BinWrap](http://github.com/andromeda/mir) is a system for protecting applications written in high-level, memory-safe languages from the security problems of memory-unsafe libraries.

**Technology Transition:**

[Require Security](https://requiresecurity.com/) is a company transitioning some of these and other supply-chain security technologies to industry.

**Press:**

* [Brown CS article](https://awards.cs.brown.edu/2023/09/26/ntousakis-kemerlis-vasilakis-and-collaborators-win-the-acm-asiaccs-23-distinguished-paper-award/) on BrinWrap our language-binary protection system.