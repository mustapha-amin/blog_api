import { type Request, type Response } from "express";
import { BadRequestError } from "../../model/api_error.ts";
import { BlogPost } from "./blog_model.ts";
import { StatusCodes } from "http-status-codes";

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
