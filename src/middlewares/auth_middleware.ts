import { type NextFunction, type Request, type Response } from "express";
import { NotFoundError, UnauthenticatedError, UnauthorizedError } from "../model/api_error.ts";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET_KEY } from "../config/env.ts";
import { User } from "../modules/user/user_model.ts";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.header("Authorization");
    if (!header) {
        throw new UnauthenticatedError("missing authorization header");
    }

    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new UnauthenticatedError("Invalid authorization format")
    };

    try {
        const payload = jwt.verify(parts[1]!, ACCESS_SECRET_KEY!) as any
        const userId = payload.userId;
        const user = await User.findOne({userId})
        if(!user) {
            throw new NotFoundError("User doesn't exist")
        }
        req.user = {userId, role: payload.role}
        next()
    } catch (error) {
        console.log(error)
        throw new UnauthenticatedError("invalid or expired token")
    }

}