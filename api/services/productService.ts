import { IProductDB, Product } from "../models/database/product.js";
import { IProductDto, productDtoProperties } from "../models/dto/productDto.js";
import { IProductInsertRequest } from "../models/request/productInsertRequest.js";
import { IProductUpdateRequest } from "../models/request/productUpdateRequest.js";
import { IProductSearchObject } from "../models/search/productSearchObject.js";
import { BaseCRUDService, ICRUDService } from "./baseCRUDService.js";


export interface IProductService extends ICRUDService<IProductDto, IProductSearchObject, IProductInsertRequest, IProductUpdateRequest> {
    //nothing for now, maybe later add stuff here.
};


class ProductService extends BaseCRUDService<IProductDto, IProductSearchObject, IProductInsertRequest, IProductUpdateRequest> {
    constructor() {
        super(Product, productDtoProperties);
    }

    //nothing for now. Maybe override functionality later, or 
    //add new services in this class. But, for now, nothing.
}