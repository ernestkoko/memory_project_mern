import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

///initialise the app
const app = express();
//enable the mavhine to read .env variables
dotenv.config();

//set up
app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));
app.use(cors());
///Use express middleware to connect the router to our app
app.use('/posts',postRoutes)

// const CONNECTION_URL='mongodb+srv://ernestkoko:kendeiyobo@cluster0.zmjga.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
 const PORT = process.env.PORT || 5000;

///connect to the db
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on Port : ${PORT}`)))
.catch((error)=>{console.log(`${error.message}`)});
mongoose.set("debug",true);