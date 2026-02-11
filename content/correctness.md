---
description: "Programming correctness in modern software systems is hard to maintain as applications scale across dependencies, languages, and distributed environments. We build systems that automatically enforce, validate, and preserve correctness properties while remaining practical for real workloads."
type: "project"
date: 2026-02-11
---

## Automating Correctness for Modern Software Systems

Modern software is assembled from many moving parts: third-party dependencies, multi-language components, dynamic runtime behavior, and distributed deployments. This makes correctness difficult to reason about and easy to regress. Our research builds automated methods and systems that make correctness a default outcome rather than a manual burden.

**Papers:** Our [HotOS25 paper](https://nikos.vasilak.is/p/sash:hotos:2025.pdf), *From Ahead-of- to Just-in-Time and Back Again: Static Analysis for Unix Shell Programs*, outlines several techniques for statically analyzing systems composed of opaque, heterogeneous components.

**Ongoing work:** Our current work focuses on (1) correctness-preserving program and system transformations, (2) automated checking of key safety and behavioral invariants in production-like settings, (3) methods for reducing the gap between provable guarantees and practical deployment constraints, and (4) toolchains that combine formal reasoning with empirical validation.

**Software & Systems:** We are building and maintaining tools that help developers verify and preserve correctness properties without rewriting entire systems or changing programming environments.
