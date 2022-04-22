# ztcc-api2 - microsservice-bank-services-transaction-account

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

## Run Test Suite
Run all tests with:
```
npm run test
```
Run **unit test**:
```
npm run test:unit
```
Run **integration test**:
```
npm run test:integration
```
Run test **coverage report**:
```
npm run test:cov
```

## Run the project - with Docker
```
docker compose up
```

## Run the project - no Docker
```
npm install
```
Then run the app
```
npm run start:local
```

## Features available

## Features Roadmap
    - [] Deposit a value to a transaction acount
    - [] Transfer values between transaction accounts

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

