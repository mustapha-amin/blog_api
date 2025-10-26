import { Router } from "express";
import { createBlogPost, fetchPosts } from "./blog_controller.ts";

const blogRouter = Router()

blogRouter.get('/', fetchPosts)
blogRouter.post('/', createBlogPost)
blogRouter.post('/:id/comment', () => { })
blogRouter.delete('/:id', () => { })

export default blogRouter