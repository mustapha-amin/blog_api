import express from "express";
import { connectDB } from "./config/db.ts";
import { logger } from "./middlewares/logger.ts";

const app = express()
const port = 3001;

app.use(express.json())
app.use(logger)

connectDB().then(() => {
    // app.use('/api/v1/auth/', authRouter)
    // app.use('/api/v1/todos/', authMiddleware, todoRouter)
    // app.use('/api/v1/users/', authMiddleware, authorize('admin'), usersRouter)
    // app.use(notFoundHandler)
    // app.use(errorHandler)

    app.listen(port, () => {
        console.log(`⚡ express app running on port ${port}`)
    })
}).catch((err) => {
    console.error(err)
    process.exit(1)
})