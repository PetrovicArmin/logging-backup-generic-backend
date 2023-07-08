import path from "path";
import dotenv from 'dotenv';

dotenv.config({path: path.join(__dirname, '..', '..', '..', 'main.env')});

const config = {
    "development": {
        "username": process.env.POSTGRES_USER,
        "password": process.env.POSTGRES_PASSWORD,
        "database": process.env.POSTGRES_DB,
        "host": "127.0.0.1",
        "port": process.env.POSTGRES_PORT,
        "dialect": "postgres"
      },
      "production": {
        "username": process.env.POSTGRES_USER,
        "password": process.env.POSTGRES_PASSWORD,
        "database": process.env.POSTGRES_DATABASE,
        "host": process.env.PG_CONTAINER_NAME,
        "dialect": "postgres"
      }
}

export default config;

module.exports = config;