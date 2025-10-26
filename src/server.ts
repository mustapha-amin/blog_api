import express from "express";
import { connectDB } from "./config/db.ts";
import { logger } from "./middlewares/logger.ts";
import authRouter from "./modules/auth/auth.routes.ts";
import { errorHandler } from "./middlewares/error_handler.ts";
import rateLimit from "express-rate-limit";
import usersRouter from "./modules/user/user.routes.ts";
import blogRouter from "./modules/blog/blog.routes.ts";
import { authMiddleware } from "./middlewares/auth_middleware.ts";

const app = express()
const port = 3001;

app.use(express.json())
app.set("trust proxy", 1)
app.use(logger)
app.use(
    rateLimit({
        windowMs: 1000 * 60 * 15,
        max: 100,
        message: "Too many requests"
    })
)

connectDB().then(() => {
    app.use('/api/v1/auth/', authRouter)
    app.use('/api/v1/users/', authMiddleware, usersRouter)
    app.use('/api/v1/posts/', authMiddleware, blogRouter)
    // app.use('/api/v1/todos/', authMiddleware, todoRouter)
    // app.use('/api/v1/users/', authMiddleware, authorize('admin'), usersRouter)
    // app.use(notFoundHandler)
    app.use(errorHandler)
    
    app.listen(port, () => {
        console.log(`⚡ express app running on port ${port}`)
    })
}).catch((err) => {
    console.error(err)
    process.exit(1)
})