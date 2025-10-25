import { Router } from "express";

const blogRouter = Router()

blogRouter.get('/', () => { })
blogRouter.post('/', () => { })
blogRouter.post('/:id/comment', () => { })
blogRouter.delete('/:id', () => { })

export default blogRouter