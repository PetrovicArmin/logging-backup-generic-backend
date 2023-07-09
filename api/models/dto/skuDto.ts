export interface ISkuDto {
    id: number;
    weight?: number;
    color?: string;
    skuCode: string;
    productId: number;
    countryOfOrigin?: string;
    price: number;
    quantityInStock: number;
};

export const skuDtoProperties = [
    "id",
    "weight",
    "color",
    "skuCode",
    "productId",
    "countryOfOrigin",
    "price",
    "quantityInStock"
]