import { Model } from "sequelize";
import map from "../models/mapper";
import { ModelType } from "../models/helperTypes";

export interface IService<TDto, TSearch> {
    get: (obj: TSearch) => Promise<TDto[]>;
    getById: (id: number) => Promise<TDto>;
};

export class BaseService<TDto, TSearch> implements IService<TDto, TSearch> {
    constructor(
        protected model: any,
        protected dtoParameters: string[]
    ) {}

    async get(obj: TSearch): Promise<TDto[]> {
       return (await this.model.findAll({ where: obj as any })).map(value => map(value, this.dtoParameters));
    }

    async getById(id: number): Promise<TDto> {
        return map((await this.model.findByPk(id)), this.dtoParameters);
    }
}