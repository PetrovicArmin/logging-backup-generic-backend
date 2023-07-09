export default interface ISkuUpdateRequest {
    weight?: number;
    color?: string;
    countryOfOrigin?: string;
    productId?: number;
    price?: number;
    quantityInStock?: number;
    updatedAt?: Date;
};