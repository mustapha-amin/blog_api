import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
    userId: mongoose.Types.ObjectId,
    title: string,
    content: string,
    updatedAt: Date,
    createdAt: Date,
}

export const BlogPostSchema = new Schema<IBlogPost>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const BlogPost = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema)