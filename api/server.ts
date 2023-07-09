import "reflect-metadata";
import express, { Express } from "express";
import bodyParser from "body-parser";
import dbInit from "./models/init.js";
import { fileURLToPath } from "url";
import path from "path";
import { Container } from "typedi";
import { ProductController } from "./controllers/applied/product.controller.js";
import { SkuController } from "./controllers/applied/sku.controller.js";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

//initialize ORM model
await dbInit();

const app: Express = express();

//middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//ioc
let productController = Container.get(ProductController);
let skuController = Container.get(SkuController);

//routes
app.use('/products', productController.getRouter());
app.use('/skus', skuController.getRouter());

const port: number = 8080; 
app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});