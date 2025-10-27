import mongoose, {Schema, Document} from "mongoose"

export interface IBlogComment extends Document{
    postId:mongoose.Types.ObjectId
    userId:mongoose.Types.ObjectId
    comment:string
}

const BlogCommentSchema = new mongoose.Schema<IBlogComment>({
    postId:{
        type: Schema.Types.ObjectId,
        ref: "BlogPost"
    },
    comment: {
        type:String,
        required:true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps:true})

export const BlogComment = mongoose.model("BlogComment", BlogCommentSchema)
