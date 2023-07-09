import map from "../models/mapper.js";

export interface IService<TDto, TSearch> {
    get: (obj: TSearch) => Promise<TDto[]>;
    getById: (id: number) => Promise<TDto>;
};

export class BaseService<TDto, TSearch> implements IService<TDto, TSearch> {
    protected model: any;

    constructor(
        model: any,
        protected dtoParameters: string[]
    ) { this.model = model; }

    async get(obj: TSearch): Promise<TDto[]> {
       return (await this.model.findAll({ where: obj as any })).map((value: any) => map(value, this.dtoParameters));
    }

    async getById(id: number): Promise<TDto> {
        return map((await this.model.findByPk(id)), this.dtoParameters);
    }
}