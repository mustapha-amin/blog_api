import type { IUser } from "../modules/user/user_model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; 
    }
  }
}
