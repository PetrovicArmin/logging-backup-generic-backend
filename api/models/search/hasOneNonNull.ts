import { IProductSearchObject } from "./productSearchObject";

const hasOneNonNull = (input: IProductSearchObject) =>
  Object.values(input).reduce((hasNonNull, value) => hasNonNull|| value !== null, false);

export default hasOneNonNull;