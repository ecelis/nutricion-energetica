# healthcoach API

REST API for meals menu

## Dependencies

Requires a Sendgrid account

## Develop

### PostgreSQL

```
docker run --name postgres -d -e POSTGRES_PASSWORD=1qaz \
    -e POSTGRES_USER=whc  -e POSTGRES_DB=whc -p5432:5432 \
    postgres
```
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

## Deploy

```
az acr build --registry webhealthcoach --image api .
```

```
az acr update -n webhealthcoach --admin-enabled true
```

```az acr task create --registry webhealthcoach --name buildapi \
    --image api \
    --context https://github.com/ecelis/nutricion-energetica.git \
    --file Dockerfile --git-access-token <github personla token>
```
