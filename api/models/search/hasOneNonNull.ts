import { IProductSearchObject } from "./productSearchObject.js";

const hasOneNonNull = (input: IProductSearchObject) =>
  Object.values(input).reduce((hasNonNull, value) => hasNonNull|| value !== null, false);

export default hasOneNonNull;