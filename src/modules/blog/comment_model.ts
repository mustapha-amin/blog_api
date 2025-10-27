import mongoose from "mongoose"

export interface IBlogComment {
    postId:string
    commentId:string
    comment:string
    userId:string
}

const BlogCommentSchema = new mongoose.Schema<IBlogComment>({
    postId:String,
    commentId:{
        type:String,
        default:crypto.randomUUID(),
    },
    comment: {
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
}, {timestamps:true})

export const BlogComment = mongoose.model("BlogComment", BlogCommentSchema)
