import { Router } from "express";
import { commentOnPost, createBlogPost, fetchPosts } from "./blog_controller.ts";

const blogRouter = Router()

blogRouter.get('/', fetchPosts)
blogRouter.post('/', createBlogPost)
blogRouter.post('/:id/comment', commentOnPost)
blogRouter.delete('/:id', () => { })

export default blogRouter