import { Router } from "express";
import { login, logout, refresh, register } from "./auth_controller.ts";

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/refresh', refresh)

export default authRouter;