export interface ISkuInsertRequest {
    weight?: number;
    color?: string;
    skuCode: string;
    productId: number;
    countryOfOrigin?: string;
    price: number;
    quantityInStock: number;
};

export const skuInsertRequestProperties = [
    "weight",
    "color",
    "skuCode",
    "productId",
    "countryOfOrigin",
    "price",
    "quantityInStock"
]