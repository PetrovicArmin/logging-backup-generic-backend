import map from "../../models/mapper.js";
import { ICRUDService } from "../../services/baseCRUDService.js";
import { BaseController } from "./baseController.js";
import { Request, Response } from "express";

export class BaseCRUDController<TDto, TSearch, TInsert, TUpdate> extends BaseController<TDto, TSearch> {
    constructor(
        service: ICRUDService<TDto, TSearch, TInsert, TUpdate>,
        searchAttributes: string[],
        private insertAttributes: string[],
        private updateAttributes: string[]
    ) {
        super(service, searchAttributes);
    }

    async insert(req: Request, res: Response) {
        return await (this.service as ICRUDService<TDto, TSearch, TInsert, TUpdate>).insert(
            map(req.body, this.insertAttributes)
        )
    }

    async update(req: Request, res: Response) {
        return await (this.service as ICRUDService<TDto, TSearch, TInsert, TUpdate>).update(
            +req.params.id,
            map(req.body, this.updateAttributes)
        )
    }
}