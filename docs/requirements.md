# Requirements Specification

## Problem Statement

Users often share URLs that are long and difficult to remember. The system provides short, memorable links that redirect to the original destination.

## Functional Requirements

### FR-1: Shorten URL

The system shall accept a valid URL and generate a unique shortened URL.

**Input**

- Original URL

**Output**

- Shortened URL

### FR-2: Custom Alias

The system shall allow users to provide a custom alias if it is available.

### FR-3: Redirect

The system shall redirect requests for a valid short URL to the original destination using HTTP 302.

### FR-4: Alias Validation

The system shall reject duplicate aliases and return an appropriate error.

## Non-Functional Requirements

### Performance

- Average redirect latency below **20 ms** (cached requests)
- P95 latency below **50 ms** under normal load

### Scalability

- Support at least **5,000 concurrent virtual users** during stress testing.

### Reliability

- Zero failed requests during baseline load testing.

### Maintainability

- Modular NestJS architecture
- Redis used as a cache layer
- MongoDB as the persistent datastore