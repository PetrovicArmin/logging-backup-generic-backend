import express, { Express } from "express";
import bodyParser from "body-parser";
import dbInit from "./models/init.js";
import { Product } from "./models/database/product.js";
import { Sku, ISkuDB, skuDBProperties } from "./models/database/sku.js";
import { ISkuDto, skuDtoProperties } from "./models/dto/skuDto.js";
import map from "./models/mapper.js";

//initialize ORM model
await dbInit();

const app: Express = express();
//middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//routes
app.get('/', (req,res) => res.json({ 'msg': 'dobrodosli' }));
app.get('/armin', async (req, res) => {
  console.log('usao!');
  const product: Product | null = await Product.findByPk(2);
  if (!product) {
    res.status(200).json({'nema ga1': 'nema ga'});
    return;
  }
  //for now only implement two mixins, in the future we will see if we need more of them.
  const allSkus: ISkuDto[] = (await product.getSkus({
    attributes: skuDBProperties
  })).map(sku => map(sku, skuDtoProperties));

  res.status(200).json(
    allSkus
  );
});


const port: number = 8080; 
app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});