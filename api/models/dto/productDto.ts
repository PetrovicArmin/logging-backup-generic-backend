export interface IProductDto {
    id: number;
    name: string;
    summary?: string;
    details?: string;
    type: string;
};

export const productDtoProperties = [
    "id",
    "name",
    "summary",
    "details",
    "type"
];