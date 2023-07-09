import { Request, Response } from "express";
import { IService } from "../../services/baseService.js";
import map from "../../models/mapper.js";

export class BaseController<TDto, TSearch> {
    constructor(
        protected service: IService<TDto, TSearch>,
        protected searchAttributes: string[]
    ){}

    async get(req: Request, res: Response) {
        res.status(200).json(await this.service.get(
            map(req.query, this.searchAttributes)
        ));
    }

    async getById(req: Request, res: Response) {
        res.status(200).json(await this.service.getById(+req.params.id));
    }
}