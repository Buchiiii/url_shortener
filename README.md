# URL SHORTNER

## DESCRIPTION
A high-performance URL shortener built with NestJS, MongoDB and Redis. It generates compact short links, supports custom aliases, and redirects users to the original destination with low-latency lookups.



## FEATURES
- Genration of unique shortened URLS
- Redirect to original link
- Custom alias
- Redis for high performance redirects
- Load and stress tested with k6


## TECH STACK
- Nest JS
- Mongo DB
- Redis
- Docker (Optional)
- K6


## GETTING STARTED
### INSTALLATION
To install the dependencies execute `npm i` in your cli
```bash
npm i 
```

### ENVIRONMENT
Create a .env file and add your environmental variables
```env
CONNECTION_URI=
REDIS_HOST=
REDIS_PORT=
```

### RUN
To start the system execute `npm run start:dev` command in your cli  
```bash
npm run start:dev
```


## API

- base-url: /api/v1

| METHOD | ENDPOINT | DESCRIPTION |
| :---: | :---: | :---: |
| POST | `/links` | To generate shortend URL|
| GET | `/:shortcode` | Redirect|

See [`docs/api.md`](docs/api.md) for request and response examples.


## PERFORMANCE
The redirect endpoint was stress tested with **5,000 virtual users** using k6.

| Metric | Before Redis | After Redis |
|---------|-------------:|------------:|
| Average latency | 1363 ms | **13.6 ms** |
| P95 latency | 4536 ms | **20.5 ms** |
| Throughput | 548 req/s | **1081 req/s** |

Full analysis: [`docs/performance.md`](docs/performance.md).