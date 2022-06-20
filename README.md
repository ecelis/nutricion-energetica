# healthcoach API

REST API for meals menu

## Dependencies

Requires a Sendgrid account

## Develop

Copy `cp env.sample .env` and edit `.env` with proper values.

Install and run with `nodemon`

```
npm install -g nodemon
nodemon
``` 

## Test

Run test environment

```
npm run test-env
```

Execute tests

```
nnpm run test
```

## Clean and import food data

```
.mode csv
.import data/food.csv food
```
