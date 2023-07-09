
import { Dialect, Sequelize } from 'sequelize'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, '..', '..', '..', 'main.env')});

const dbName = process.env.POSTGRES_DB as string
const dbUser = process.env.POSTGRES_USER as string
if (!process.env.POSTGRES_PORT)
    throw Error('Postgres port is not defined!');
const dbPort = +process.env.POSTGRES_PORT;
const dbHost = process.env.NODE_ENV == 'production' ? process.env.PG_CONTAINER_NAME : 'localhost';
const dbDriver = 'postgres' as Dialect;
const dbPassword = process.env.POSTGRES_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    port: dbPort
});

export default sequelizeConnection