export interface ISkuSearchObject {
    id?: number;
    skuCode?: string;
    productId?: number;
    quantityInStock?: number;
    price?: number;
};

export const skuSearchObjectProperties = [
    "id",
    "skuCode",
    "productId",
    "quantityInStock",
    "price"
];