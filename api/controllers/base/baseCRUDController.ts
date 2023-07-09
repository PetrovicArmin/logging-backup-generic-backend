import map from "../../models/mapper.js";
import { ICRUDService } from "../../services/baseCRUDService.js";
import { BaseController } from "./baseController.js";
import { Request, Response, Express, Router } from "express";

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
        try {
            res.status(200).json(
                await (this.service as ICRUDService<TDto, TSearch, TInsert, TUpdate>).insert(
                    map(req.body, this.insertAttributes)
                )
            )
        } catch(err: any) {
            if (err.errors)
                res.status(400).json({
                    errors: err.errors.map((errr: any) => errr.message)
                })
            else 
                res.status(400).json(err);
        }
    }

    async update(req: Request, res: Response) {
        try {
            res.status(200).json(
                await (this.service as ICRUDService<TDto, TSearch, TInsert, TUpdate>).update(
                    +req.params.id,
                    map(req.body, this.updateAttributes)
                )
            )
        } catch(err: any) {
            if (err.errors)
                res.status(400).json({
                    errors: err.errors.map((errr: any) => errr.message)
                })
            else 
                res.status(400).json(err);
        }
    }

    override getRouter(): Router {
        this.router = super.getRouter();
        this.router.post('/', (req: Request, res: Response) => this.insert(req, res));
        this.router.put('/:id', (req: Request, res: Response) => this.update(req, res));
        return this.router;
    }
}