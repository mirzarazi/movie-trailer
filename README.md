Coding Challenge
===================
This api has been developed on Nest.js framework, for retreiving movie trailers for movies
## How it works
### Requiements
Developement
* Node 12

Production  
* Docker 

### How to run
development  
```
export TMDB_API_KEY=[your api key from tmdb]
yarn
yarn start:dev
```
production
```
docker build . -t trailer_service
docker run -p 3000:3000 -e TMDB_API_KEY=[your api key from tmdb] trailer_service
```

1. Navigate to [http://localhost:3000/api]
2. Send a Get request on '/api/v1/trailer' with openapi dashboard

### Test
All the functions have unit test.
```
yarn test
yarn test:e2e
yarn test:cov
```


# Post-challenge questions

1. Is the service production ready? 
```Yes this service is completely ready to be used as a production service. This is a modular service that can handle variety of information service```
2. What is your solution for high load?
```Simplest solution that came to my mind was using cahce so every req/res will be cached for 1 hour so there wouldn't be any load on server on similar requests```
3. What about test?  
```Unit tests has been developed also E2E tests has been implemented as well```

# Future improvements
* Implementing logging system
* Developing test for modules and constructor
* Configuring CI/CD

----------

#### Thanks for Amazing challenge I hope to hear from you soon

Ehsan Mirzarazi
