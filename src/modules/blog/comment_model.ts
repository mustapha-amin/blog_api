import mongoose, {Schema, Document} from "mongoose"

export interface IBlogComment extends Document{
    _id: mongoose.Types.ObjectId; 
    postId:mongoose.Types.ObjectId
    userId:mongoose.Types.ObjectId
    comment:string
    createdAt:Date
    updatedAt:Date
}

const BlogCommentSchema = new mongoose.Schema<IBlogComment>({
    postId:{
        type: Schema.Types.ObjectId,
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

BlogCommentSchema.virtual("id").get(function (this:IBlogComment) {
  return this._id.toHexString();
});

BlogCommentSchema.set("toJSON", {
  virtuals: true,         
  versionKey: false,      
  transform: (_, ret:any) => {
    delete ret._id;       
  },
});


export const BlogComment = mongoose.model("BlogComment", BlogCommentSchema)
