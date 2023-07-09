import { Service } from "typedi";
import { IProductDB, Product } from "../models/database/product.js";
import { IProductDto, productDtoProperties } from "../models/dto/productDto.js";
import { IProductInsertRequest } from "../models/request/productInsertRequest.js";
import { IProductUpdateRequest } from "../models/request/productUpdateRequest.js";
import { IProductSearchObject } from "../models/search/productSearchObject.js";
import { BaseCRUDService, ICRUDService } from "./baseCRUDService.js";
import { ISkuDto, skuDtoProperties } from "../models/dto/skuDto.js";
import { ISkuSearchObject } from "../models/search/skuSearchObject.js";
import { ISkuInsertRequest } from "../models/request/skuInsertRequest.js";
import { ISkuUpdateRequest } from "../models/request/skuUpdateRequest.js";
import { Sku } from "../models/database/sku.js";

export interface ISkuService extends ICRUDService<ISkuDto, ISkuSearchObject, ISkuInsertRequest, ISkuUpdateRequest> {
    //nothing for now, maybe later add stuff here.
};

@Service()
export class SkuService extends BaseCRUDService<ISkuDto, ISkuSearchObject, ISkuInsertRequest, ISkuUpdateRequest> implements ISkuService{
    constructor() {
        super(Sku, skuDtoProperties);
    }

    //nothing for now. Maybe override functionality later, or 
    //add new services in this class. But, for now, nothing.
}