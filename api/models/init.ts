import { Product } from "./database/product.js";
import { Sku } from "./database/sku.js";


const dbInit = () => Promise.all([
    Product.sync(),
    Sku.sync()
]);

export default dbInit;