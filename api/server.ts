import "reflect-metadata";
import express, { Express } from "express";
import bodyParser from "body-parser";
import dbInit from "./models/init.js";
import { fileURLToPath } from "url";
import path from "path";
import { Container } from "typedi";
import { ProductController } from "./controllers/applied/product.controller.js";
import { SkuController } from "./controllers/applied/sku.controller.js";
import winston from 'winston';
import expressWinston from 'express-winston';
import dotenv from 'dotenv';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, '..', '..', 'main.env')});

//initialize ORM model
await dbInit();

const app: Express = express();

//middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//api logger
expressWinston.requestWhitelist.push('body'); //be careful of this data!
expressWinston.responseWhitelist.push('body');

if (!process.env.LOGS_PATH)
  throw Error('LOGS_PATH environment variable not defined!');

if (!process.env.BACKUP_PATH)
  throw Error('BACKUP_PATH environment variable not defined!');

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: "api.log", dirname: path.join(process.env.LOGS_PATH, 'api.log') })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  expressFormat: true
}));

//ioc
let productController = Container.get(ProductController);
let skuController = Container.get(SkuController);

//routes
app.use('/products', productController.getRouter());
app.use('/skus', skuController.getRouter());

//error logger
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'errors.log', dirname: path.join(process.env.LOGS_PATH, 'errors.log') })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint()
  )
}));

const port: number = 8080; 
app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});