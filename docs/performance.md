# PERFORMANCE EVALUATION

## OBJECTIVE
Evaluate the redirect enpoint using increasing concurrency and measure the effect of redis caching.


## ENVIRONMENT
- NEST JS
- MONGO DB
- Redis
- Local Windows Machine
- K6
- Docker (Optional)

## STRESS TEST 

### CONFIGURATION
```javascript
stages: [
  { duration: '30s', target: 100 },
  { duration: '30s', target: 500 },
  { duration: '30s', target: 1000 },
  { duration: '30s', target: 2000 },
  { duration: '30s', target: 5000 },
]
```

### Results

| Metric | Before Caching | After Caching |
|---------|-------:|------:|
| Average | 1363.93 ms | 13.58 ms |
| Median | 802.98 ms | 2.67 ms |
| P90 | 3862.01 ms | 12.26 ms |
| P95 | 4535.58 ms | 20.54 ms |
| Throughput | 547.65 req/s | 1080.79 req/s |

---

## Observation
- Waiting time accounted for nearly the entire request duration before caching
- Redis reduced database reads for repeated redirects, producing ~221x reduction in P95 latency


## Conclusion
Redis caching removed the primary bottleneck of requests waiting to be attended to. It also doubled the throughputwhile maintaining a <25ms P95 latency