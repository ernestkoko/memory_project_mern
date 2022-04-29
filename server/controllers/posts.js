import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";




/// [getPosts] handles get request from client
export const getPosts=async (req,res)=>{
   try{
       const postMessages = await PostMessage.find();
       console.log(postMessages);
       res.status(200).json(postMessages);
   }catch(error){
       res.status(404).json({message:error.message});

   }
};

/// [createPost] handles post request from client
export  const createPost=async (req,res)=>{
    const post = req.body;
    const newPost = new PostMessage(post);
    try{
       await  newPost.save();

       ///respond with 201 as the status code to show new post has been created
       res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({message:error.message});

    }
    
}

///update an existing post
export const updatePost=async(req,res)=>{
    const {id: _id } =req.params;
    const post = req.body;
   //check if the  _id is a mongoose id
   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Nod popst with that Id');

    try{

   const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post, _id}, {new:true});
   res.json(updatedPost);
    }catch(error){
        res.status(402).json({message:error.message});
    }

}

///Delete post
export const deletePost=async(req,res)=>{
    const {id } =req.params;
    console.log(id);
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No popst with that Id');

    try{
        await PostMessage.findByIdAndRemove(id);
       //console.log("DELETE");
       res.json({message:"Post deleted successfully"});
    }catch(error){
        res.json({message: error.message});
         
    }


}

export const likePost =async(req,res)=>{
    const {id } =req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No popst with that Id');

    try{
       const post = await PostMessage.findById(id);
       const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount + 1}, {new :true});
        res.json(updatedPost);

    }catch(error){

    }

}