import { IProductDto } from "../../models/dto/productDto.js";
import { IProductInsertRequest, productInsertRequestProperties } from "../../models/request/productInsertRequest.js";
import { IProductUpdateRequest, productUpdateRequestProperties } from "../../models/request/productUpdateRequest.js";
import { IProductSearchObject, productSearchObjectProperties } from "../../models/search/productSearchObject.js";
import { IProductService } from "../../services/product.service.js";
import { BaseCRUDController } from "../base/baseCRUDController.js";

export class ProductController extends BaseCRUDController<IProductDto, IProductSearchObject, IProductInsertRequest, IProductUpdateRequest> {
    constructor(
        private readonly _service: IProductService
    ) {
        super(
            _service,
            productSearchObjectProperties,
            productInsertRequestProperties,
            productUpdateRequestProperties
        )
    }

    //if needed some detailed routes we will implement them here.
}