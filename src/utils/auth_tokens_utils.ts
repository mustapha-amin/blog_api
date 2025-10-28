import jwt, { type JwtPayload, type Secret, type SignOptions } from "jsonwebtoken";
import type { IUser } from "../modules/user/user_model.ts";
import { ACCESS_EXPIRES_IN, ACCESS_SECRET_KEY, REFRESH_EXPIRES_IN, REFRESH_SECRET_KEY } from "../config/env.ts";
import type { ReqUser } from "../types/request.js";
import { UnauthorizedError } from "../model/api_error.ts";

export function generateTokens(user: ReqUser) {
    const access = jwt.sign({ userId: user.userId, role: user.role }, ACCESS_SECRET_KEY as Secret, { expiresIn: ACCESS_EXPIRES_IN } as SignOptions);
    const refresh = jwt.sign({ userId: user.userId, role: user.role }, REFRESH_SECRET_KEY as Secret, { expiresIn: REFRESH_EXPIRES_IN } as SignOptions);
    
    return { access, refresh }
}

export function verifyAccessToken(access: string) {
  try {
    const payload = jwt.verify(access, ACCESS_SECRET_KEY!);
    return payload; 
  } catch {
    return null;
  }
}

export function verifyRefreshToken(refresh: string) {
  try {
    const payload = jwt.verify(refresh, REFRESH_SECRET_KEY!);
    return payload as any; 
  } catch {
   throw null
  }
}
