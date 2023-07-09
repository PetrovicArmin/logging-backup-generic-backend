import { Request, Response, Router } from "express";
import { IService } from "../../services/baseService.js";
import map from "../../models/mapper.js";
import express, { Express } from "express";

export class BaseController<TDto, TSearch> {
    protected router = express.Router();

    constructor(
        protected service: IService<TDto, TSearch>,
        protected searchAttributes: string[]
    ){}

    async get(req: Request, res: Response) {
        try {
            res.status(200).json(await this.service.get(
                map(req.query, this.searchAttributes)
            ));
        } catch(err: any) {
            if (err.errors)
                res.status(400).json({
                    errors: err.errors.map((errr: any) => errr.message)
                })
            else 
                res.status(400).json(err);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            res.status(200).json(await this.service.getById(+req.params.id));
        } catch(err: any) {
            if (err.errors)
                res.status(400).json({
                    errors: err.errors.map((errr: any) => errr.message)
                })
            else 
                res.status(400).json(err);
        }
    }

    getRouter(): Router {
        this.router.get('/', (req: Request, res: Response) => this.get(req, res));
        this.router.get('/:id', (req: Request, res: Response) => this.getById(req, res));
        return this.router;
    }
}