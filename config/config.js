require('dotenv').config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_DB
} = process.env;

module.exports = {
  "development": {
    "username": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRES_DB,
    "host": POSTGRES_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": false
    },
    "logging": true
  },
  "test": {
    "username": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRES_DB,
    "host": POSTGRES_HOST,"dialect": "postgres",
    "dialectOptions": {"ssl": false}
  },
  "production": {
    "username": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRES_DB,
    "host": POSTGRES_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": false
    }
  }
}
