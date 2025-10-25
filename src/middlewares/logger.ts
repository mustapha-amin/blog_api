import { type NextFunction, type Request, type Response } from "express";

export function logger(req: Request, _:Response, next: NextFunction) {
    console.log(`${req.method} ${req.url} ${Date.now()}`)
    next()
}