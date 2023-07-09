export interface IProductInsertRequest {
    name: string;
    summary?: string;
    details?: string; 
    type: string;
};

export const productInsertRequestProperties = [
    "name",
    "summary",
    "details",
    "type"
];