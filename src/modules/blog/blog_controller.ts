import { type Request, type Response } from "express";
import { BadRequestError } from "../../model/api_error.ts";
import { BlogPost } from "./blog_model.ts";
import { StatusCodes } from "http-status-codes";
import { BlogComment } from "./comment_model.ts";

export async function createBlogPost(req:Request, res: Response) {
    const {content} =  req.body;

    if(!content) {
        throw new BadRequestError("Missing required parameters")
    }
    const userId = req.user?.userId
    await BlogPost.create({userId, content})

    return res.status(StatusCodes.CREATED).json({
        message:"post created successfully"
    })
}

export async function fetchPosts(_:Request, res: Response) {
    const posts = await BlogPost.find({}).sort({"createdAt" : -1})

    return res.status(StatusCodes.OK).json({
        message:"Posts fetched successfully",
        posts
    })
}

export async function commentOnPost(req:Request, res: Response) {
    const {comment} = req.body;
    const postId = req.params.id;
    const userId = req.user?.userId

    if(!comment || !postId) {
        throw new BadRequestError("Missing required parameters")
    }

    const post = await BlogPost.findById(postId)

    if(!post) {
        throw new BadRequestError("Post with the specified id not found")
    }

    await BlogComment.create({postId, comment, userId})

    return res.status(StatusCodes.CREATED).json({
        message:"Comment created"
    })
}

export async function fetchPostComments(req:Request, res:Response) {
     const postId = req.params.id;
     if(!postId) {
        throw new BadRequestError("Missing required parameters")
     }

     
}