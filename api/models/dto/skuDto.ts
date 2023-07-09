export default interface ISkuDto {
    id: number;
    weight?: number;
    color?: string;
    skuCode: string;
    productId: number;
    countryOfOrigin?: string;
    price: number;
    quantityInStock: number;
};