import express, { Express } from "express";
import bodyParser from "body-parser";
import dbInit from "./models/init.js";
import { Product } from "./models/database/product.js";
import { Sku } from "./models/database/sku.js";

//initialize ORM model
await dbInit();

const app: Express = express();

//middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//routes
app.get('/', async (req, res) => {
  const product: Product | null = await Product.findByPk(1);
  if (!product) {
    res.status(200).json({'nema ga': 'nema ga'});
    return;
  }
  //for now only implement two mixins, in the future we will see if we need more of them.
  const allSkus: Sku[] = await product.getSkus();
  res.status(200).json(
    allSkus
  );
});

const port: number = 8080; 
app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});