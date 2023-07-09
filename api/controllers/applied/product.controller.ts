import { Router } from "express";
import { IProductDto } from "../../models/dto/productDto.js";
import { IProductInsertRequest, productInsertRequestProperties } from "../../models/request/productInsertRequest.js";
import { IProductUpdateRequest, productUpdateRequestProperties } from "../../models/request/productUpdateRequest.js";
import { IProductSearchObject, productSearchObjectProperties } from "../../models/search/productSearchObject.js";
import { ProductService } from "../../services/product.service.js";
import { BaseCRUDController } from "../base/baseCRUDController.js";
import { Service, Container } from "typedi";


@Service()
export class ProductController extends BaseCRUDController<IProductDto, IProductSearchObject, IProductInsertRequest, IProductUpdateRequest> {
    constructor( 
    ) {
        super(
            Container.get(ProductService),
            productSearchObjectProperties,
            productInsertRequestProperties,
            productUpdateRequestProperties
        );
    }

    override getRouter(): Router {
        this.router = super.getRouter();
        return this.router;
    }
    //if needed some detailed routes we will implement them here.
}