import express, { Express } from "express";
import bodyParser from "body-parser";

const app: Express = express();

//middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//routes

const port: number = 8080; 
app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});