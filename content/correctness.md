---
description: "Programming correctness in modern software systems is hard to maintain as applications scale across dependencies, languages, and distributed environments. We build systems that automatically enforce, validate, and preserve correctness properties while remaining practical for real workloads."
type: "project"
date: 2026-02-11
---

## Automating Software Correctness

Modern software correctness often fails at boundaries: between components, across languages, and under transformation. We build analyses and systems that recover missing structure, make behavior inspectable, and justify key transformations with formal or protocol-level guarantees.

**Systems and papers:** Our [HotOS'25 paper](https://nikos.vasilak.is/p/sash:hotos:2025.pdf), *From Ahead-of- to Just-in-Time and Back Again*, pushes this line toward static analysis for real shell programs. Towards expanding the reach of these analyses, [Caruca](https://arxiv.org/abs/2510.14279) mines specifications for the observable behavior of opaque components, and [Try](https://github.com/binpash/try) complements this direction with a lightweight frontend for inspecting a command's effects before it touches a live system.

Our [PaSh ICFP'21 paper](https://doi.org/10.1145/3473570), *An order-aware dataflow model for parallel Unix pipelines*, gives the formal core of PaSh's parallelizing transformations and compiler.

Several of the group's projects deliver proofs of correctness for key properties. Our system, [hS (HotOS'23)](https://doi.org/10.1145/3593856.3595891) brings speculative out-of-order shell execution with a verified speculator component; [Themis (ARES'22)](https://doi.org/10.1145/3538969.3538983) analyzes the security properties of its decentralized service-interaction protocol suite; and [Harp (CCS'21)](http://nikos.vasilak.is/p/harp:ccs:2021.pdf) gives learning-and-regeneration guarantees aimed at preserving client-observable behavior while eliminating unwanted side-effects.

**Ongoing work:** Our current work focuses on (1) correctness-preserving program and system transformations, (2) automated checking of key safety and behavioral invariants in production-like settings, (3) methods for reducing the gap between provable guarantees and practical deployment constraints, and (4) toolchains that combine formal reasoning with empirical validation.
