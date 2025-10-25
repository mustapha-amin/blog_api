import { Router } from "express";

const blogRouter = Router()

blogRouter.get('/')
blogRouter.post('/create')
blogRouter.post('/comment')
blogRouter.delete('/:id')