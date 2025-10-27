import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import type { IUser } from "../modules/user/user_model.ts";
import { ACCESS_EXPIRES_IN, ACCESS_SECRET_KEY, REFRESH_EXPIRES_IN, REFRESH_SECRET_KEY } from "../config/env.ts";

export function generateTokens(user: IUser) {
    const access = jwt.sign({ userId: user.id, role: user.role }, ACCESS_SECRET_KEY as Secret, { expiresIn: ACCESS_EXPIRES_IN } as SignOptions);
    const refresh = jwt.sign({ userId: user.id, role: user.role }, REFRESH_SECRET_KEY as Secret, { expiresIn: REFRESH_EXPIRES_IN } as SignOptions);
    
    return { access, refresh }
}