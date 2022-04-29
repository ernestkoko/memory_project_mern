import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    }
    
});

//add createdAt automatically
postSchema.set('timestamp',true);

//turn the schema to a model
const PostMessage =mongoose.model('PostMessage', postSchema);

export default PostMessage;