# ztcc-api2

## Project - microsservice-bank-services-transaction-account
Z-Tech code challenge, api2.

## Description:
Service responsible to perform bank services. The service perform tasks such as deposit a value to a transaction account, transfer values between active transaction accounts. Check the current features section to see what you can do by now and the roadmap section for features coming soon.

## Project
Z-Tech code challenge, api2.

## Description:
Service responsible to perform bank services. The service perform tasks such as deposit a value to a transaction account, transfer values between active transaction accounts. Check the current features section to see what you can do by now and the roadmap section for features coming soon.

## Tech stack
This service is built with:
- Typescript
- NodeJS
- NestJS
- Jest
- TypeORM
- Postgres
- Docker
- Heroku

## Run Test Suite
Run all tests with:

1. Install dependencies
```
npm install
```
2. Run tests command
```
npm run test
```

## Run the project - with Docker

1. Rename **.env-example** file to **.env**, this file will be used by docker-compose

2. Run the app from docker-compose file
```
docker compose up
```

## Features available
    - [x] Deposit a value to a transaction account
    - [x] Transfer a value between transaction account

## Features Roadmap
    - [] Add tax fields to TransactionObjectModel
    - [] Tax logic on services endpoint

## Architecture of this service

## AS IS:
### Code design
Check this document for the complete explanation of my design decisions.
This project uses a layer separation based on Clean architecture, concepts such as depency injection, inversion control and adapters are applied in the project, you can check reading the diagram and the codebase.

### Database modeling
Check this document for the complete explanation of my database modeling.
For simplicity this proof of concept uses MySQL, by now I'm not dicussing scalability or read/write separation on database level. In my experience this kind of decision is taken in colaboration with a database administrator.

## TO BE:
### Code design
Design and architecture desicisions change with time, here's how I see this architecture decisions evolving for this codebase.

### Database modeling
It's common to add new databases for cache, incomplete data or to provide better experiences on access external dependencies. here's how I see the database needs for this project evolve.

