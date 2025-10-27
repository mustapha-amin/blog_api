import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
    userId: mongoose.Types.ObjectId,
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
    content: {
        type: String
    },
}, { timestamps: true })

export const BlogPost = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema)