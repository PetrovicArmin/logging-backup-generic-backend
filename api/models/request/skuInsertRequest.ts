export interface ISkuInsertRequest {
    weight?: number;
    color?: string;
    skuCode: string;
    productId: number;
    countryOfOrigin?: string;
    price: number;
    quantityInStock: number;
};