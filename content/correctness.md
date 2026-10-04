---
description: "Programming correctness in modern software systems is hard to maintain as applications scale across dependencies, languages, and distributed environments. We build systems that automatically enforce, validate, and preserve correctness properties while remaining practical for real workloads."
type: "project"
date: 2026-02-11
---

## Improving the Robustness of Modern Software Systems

Modern software systems fail in a variety of ways. 
We are developing systems for improving the reliability and robustness of these systems—including checks and guarantees before, during, and after their execution.

**Systems and papers:** [RT](https://github.com/atlas-brown/rt) ([OSDI'26](https://atlas.cs.brown.edu/pdf/rt:osdi:2026.pdf)) is a new regular-language-based type system for inter-process communication.
[Sash](https://github.com/atlas-brown/sash) ([SOSP'26](https://atlas.cs.brown.edu/pdf/sash:sosp:2026.pdf)) statically analyzes shell program effects to find bugs before they cause irreversible damage.
Towards expanding the reach of these analyses, [Caruca](https://arxiv.org/abs/2510.14279) mines specifications for the observable behavior of opaque components.
During execution, the [try](https://github.com/binpash/try) subsystem ([OSDI'26](https://atlas.cs.brown.edu/pdf/try:osdi:2026.pdf)) controls the effects of opaque software components.

Several of the group's projects deliver proofs of correctness for key properties. Our system, [hS (OSDI'26)](https://www.usenix.org/conference/osdi26/presentation/liargkovas) brings speculative out-of-order shell execution with a verified speculator component; [Themis (ARES'22)](https://doi.org/10.1145/3538969.3538983) analyzes the security properties of its decentralized service-interaction protocol suite; [Harp (CCS'21)](http://nikos.vasilak.is/p/harp:ccs:2021.pdf) gives learning-and-regeneration guarantees aimed at preserving client-observable behavior while eliminating unwanted side-effects; and 
our [PaSh ICFP'21 paper](https://doi.org/10.1145/3473570) gives the formal core of PaSh's parallelizing transformations and compiler.

**Ongoing work:** Our current work focuses on (1) correctness-preserving program and system transformations, (2) automated checking of key safety and behavioral invariants in production-like settings, (3) methods for reducing the gap between provable guarantees and practical deployment constraints, and (4) toolchains that combine formal reasoning with empirical validation.
