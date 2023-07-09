import { Router } from "express";
import { BaseCRUDController } from "../base/baseCRUDController.js";
import { Service, Container } from "typedi";
import { ISkuDto } from "../../models/dto/skuDto.js";
import { ISkuSearchObject, skuSearchObjectProperties } from "../../models/search/skuSearchObject.js";
import { ISkuInsertRequest, skuInsertRequestProperties } from "../../models/request/skuInsertRequest.js";
import { ISkuUpdateRequest, skuUpdateRequestProperties } from "../../models/request/skuUpdateRequest.js";
import { SkuService } from "../../services/sku.service.js";


@Service()
export class SkuController extends BaseCRUDController<ISkuDto, ISkuSearchObject, ISkuInsertRequest, ISkuUpdateRequest> {
    constructor( 
    ) {
        super(
            Container.get(SkuService),
            skuSearchObjectProperties,
            skuInsertRequestProperties,
            skuUpdateRequestProperties
        );
    }

    override getRouter(): Router {
        this.router = super.getRouter();
        return this.router;
    }
    //if needed some detailed routes we will implement them here.
}