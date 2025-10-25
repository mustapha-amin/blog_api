import { type Request, type Response } from "express";

export function logger(req: Request, _:Response) {
    console.log(`${req.method} ${req.body} ${Date.UTC}`)
}