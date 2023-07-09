export interface ISkuUpdateRequest {
    weight?: number;
    color?: string;
    countryOfOrigin?: string;
    productId?: number;
    price?: number;
    quantityInStock?: number;
    updatedAt?: Date;
};

export const skuUpdateRequestProperties = [
    "weight",
    "color",
    "countryOfOrigin",
    "productId",
    "price",
    "quantityInStock",
    "updatedAt"
]