import { Router } from "express";
import { commentOnPost, createBlogPost, fetchPostComments, fetchPosts } from "./blog_controller.ts";

const blogRouter = Router()

blogRouter.get('/', fetchPosts)
blogRouter.get('/:id/comments', fetchPostComments)
blogRouter.post('/', createBlogPost)
blogRouter.post('/:id/comment', commentOnPost)
blogRouter.delete('/:id', () => { })

export default blogRouter