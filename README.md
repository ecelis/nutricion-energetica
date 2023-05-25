# healthcoach API

I started this project to dust off my JavaScript skills and learn [Sequelize](https://sequelize.org/) and 💅🏾[styled-components](https://styled-components.com/) in the process. Also as a showoff to potential employers while I was in the hunt for a new job.

This is the RESTful API for [Web Health Coach](https://github.com/ecelis/healtcoach).

## Dependencies

Requires a Sendgrid account

## Develop

### Docker

Azure currently runs PostgreSQL 13.7

```
docker compose up -d
```

There are two config files, this is redundant and will be fixed in the near future.

Copy `cp config/sample.config.json config/config.json` and edit `config/config.json` with proper values.

Copy `cp env.sample .env.local` and edit `.env.local` with proper values.

```
docker build -t whcapi .
```

#### Docker run

```
docker run -d --name whcapi -p 3000:3000 --env-file=.env.docker --link whcdb whcapi
```

### Install and run with `nodemon`

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

### Publish API docker image to Azure Container Registry

Build image

```
az acr build --registry webhealthcoach --image api .
```

TODO (something about amin user enabled for related tasks in Azure)
Enable ??? 

```
az acr update -n webhealthcoach --admin-enabled true
```

Create task to deploy container when new images are published in the registry.

```az acr task create --registry webhealthcoach --name buildapi \
    --image api \
    --context https://github.com/ecelis/nutricion-energetica.git \
    --file Dockerfile --git-access-token <github personla token>
```

### PostgreSQL

```
psql "host=<somedb>.postgres.database.azure.com port=5432 \
    dbname=<db> user=<user> password=<passwoord> sslmode=require"
```