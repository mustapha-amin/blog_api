import { Router } from "express";
import { login, logout, register } from "./auth_controller.ts";

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

export default authRouter;