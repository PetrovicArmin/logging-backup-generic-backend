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

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

//initialize ORM model
await dbInit();

const app: Express = express();

//middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//api logger
expressWinston.requestWhitelist.push('body'); //be careful of this data!
expressWinston.responseWhitelist.push('body');

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: "api.log", dirname: path.join(__dirname, '..', 'logs') })
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
    new winston.transports.File({ filename: 'errors.log', dirname: path.join(__dirname, '..', 'logs') })
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