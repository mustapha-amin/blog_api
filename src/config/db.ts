import mongoose from "mongoose";
import { MONGODB_URL } from "./env.ts";
import { BlogPost } from "../modules/blog/blog_model.ts";

export async function  connectDB() {
  await mongoose.connect(MONGODB_URL!).then(async(_)  => {
    console.log("⚡ Mongo DB connected")
    // await mongoose.connection.dropDatabase();
    // await BlogPost.collection.drop()
    // console.log('Database dropped');
    // mongoose.connection.close();
  }).catch((e) =>{
    console.log("An error occured")
    console.log(e)
  })
}