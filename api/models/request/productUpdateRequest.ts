export interface IProductUpdateRequest {
    name?: string;
    summary?: string;
    details?: string; 
    type?: string;
    updatedAt?: Date;
};

export const productUpdateRequestProperties = [
    "name",
    "summary",
    "details",
    "type",
    "updatedAt"
];