import express, { Express } from "express";
import bodyParser from "body-parser";
import dbInit from "./models/init.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

//initialize ORM model
await dbInit();

const app: Express = express();

//middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//ioc

//routes


const port: number = 8080; 
app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});