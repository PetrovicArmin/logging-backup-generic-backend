import { createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";

export const loadContainer = (app: Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    })
    app.use(scopePerRequest(container));
}