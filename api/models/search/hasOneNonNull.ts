import { ProductSearchObject } from "./productSearchObject";

const hasOneNonNull = (input: ProductSearchObject) =>
  Object.values(input).reduce((hasNonNull, value) => hasNonNull|| value !== null, false);

export default hasOneNonNull;