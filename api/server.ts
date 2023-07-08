import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const path = require('path');
dotenv.config({path: path.join(__dirname, '..', '..', 'main.env')});

if (!process.env.NODE_ENV) 
  throw Error("Environment not defined!");

const app: Express = express();

//middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//routes

const port: number = 8080; 
app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});