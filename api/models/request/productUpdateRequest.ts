export interface IProductUpdateRequest {
    name?: string;
    summary?: string;
    details?: string; 
    type?: string;
    updatedAt?: Date;
};

export const productUpdateRequest = [
    "name",
    "summary",
    "details",
    "type",
    "updatedAt"
];