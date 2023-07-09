import { BaseService, IService } from "./baseService.js";
import map from "../models/mapper.js";


export interface ICRUDService<TDto, TSearch, TInsert, TUpdate> extends IService<TDto, TSearch>{
    insert: (insert: TInsert) => Promise<TDto>;
    update: (id: number, update: TUpdate) => Promise<TDto>;
    delete: (id: number) => Promise<string>;
}

export class BaseCRUDService<TDto, TSearch, TInsert, TUpdate> extends BaseService<TDto, TSearch> implements ICRUDService<TDto, TSearch, TInsert, TUpdate> {
    constructor(
        model: any,
        dtoParameters: string[]
    ) { super(model, dtoParameters) }

    async insert(insert: TInsert): Promise<TDto> {
        return map(await this.model.create(insert as any), this.dtoParameters);
    }

    async update(id: number, update: TUpdate): Promise<TDto> {
        return map((await this.model.update(
            update as any,
            { where: { id: id } as any, returning: true }
        ))[1][0], this.dtoParameters);
    }

    async delete(id: number): Promise<string> {
        const destroyed = await this.model.destroy({ where: { id: id } as any });
        return `Successfully destroyed ${destroyed} resources`;
    }
}
