const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const express=require('express')
 const app=express();
 app.use(express.json())
const user=new mongoose.Schema({
            username:String,
            useremail:String,
            password:"String",
})


// Function to authenticate JWT tokens
//function authenticateToken(req, res, next) {
    //const authHeader = req.headers['authorization'];
    //const token = authHeader && authHeader.split(' ')[1];
    
    //if (token == null) return res.sendStatus(401);
    
    // jwt.verify(token, PrivateKey, (err, user) => {
    //     if (err) return res.sendStatus(403);
    //     req.user = user;
    //     next();
    // });
//}

// Create the model
const Blog = mongoose.model('Blog',user );

module.exports =  Blog // Export as an object

