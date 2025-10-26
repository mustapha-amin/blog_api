import mongoose from "mongoose";

export interface IBlogPost {
    postId: string,
    userId: string,
    content: string,
}

export const BlogPostSchema = new mongoose.Schema<IBlogPost>({
    postId: {
        type: String,
        default: crypto.randomUUID(),
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
}, {timestamps:true})

export const BlogPost = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema)