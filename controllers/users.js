const express=require('express');
const app=express();
const mongoose=require('mongoose');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const users=require('../Models/users');
const checkauth=require('../Authentication/CheckAuth');

exports.getUsers=(req,res)=>{
    users.find()
    .then(doc=>{res.status(200).json({doc})})
    .catch(err=>{res.status(501).json({err})})
}

exports.signup=(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({err,"Message":"Signup failed."});
        }
        else{
            const user=new users({
                _id:mongoose.Types.ObjectId(),
                email:req.body.email,
                password:hash,
                username:req.body.username,
            })
            user.save()
            .then(doc=>{
                if(doc){
                    const token=jwt.sign({
                        email:user.email,
                        username:user.username,
                        userId:user._id},
                    process.env.SECRET_TOKEN_KEY,
                    {expiresIn:"3h"}
                    );
                    return res.status(200).json({doc,"Message":"Successfully signed up :)",token});
                }
                })
            .catch(err=>{res.status(501).json({err,"Message":"Signup failed."})})
        }
    })
}

exports.login=(req,res)=>{
    users.find({email:req.body.email}).exec()
    .then(user=>{
        if(user.length<1){res.status(501).json({"Message":"Login failed."})}
        else{
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    res.status(501).json({"Message":"Login failed."})
                }
                if(result){
                    const token=jwt.sign({
                        email:user[0].email,
                        username:user[0].username,
                        userId:user[0]._id
                    },
                    process.env.SECRET_TOKEN_KEY,
                    {
                        expiresIn:"3h"
                    }
                    );
                    // console.log(token);
                    // res.cookie('jwt',token,{httpOnly:true});
                    // return res.status(200).json({"Message":"Authentication Successful.Welcome!!","Token":token})
                        // const user=await User.login(email,password);
                        // const token=createToken(user._id);
                        // res.cookie('jwt',token,{httpOnly:true});
                        // console.log(token);
                    return res.status(200).json({"Message":"Authentication Successful.Welcome!!",token});
                }
                else{res.status(400).json({
                    "Message":"Login Failed.Enter correct email or password."
                })}
            })
        }
    })
    .catch(err=>{res.status(501).json({err,"Message":"Login failed."})})
};

exports.deleteUser=(req,res)=>{
    const usernameProvidedByUser=req.body.username;
    if(usernameProvidedByUser==req.userData.username){
    users.remove({username:usernameProvidedByUser}).exec()
    .then(result=>{res.status(200).json("User Successfully Deleted.")})
    .catch(err=>{res.status(404).json(err,"User Not Deleted.")});
    }
    else{
        return res.status(404).json("Please Enter Your Username Only.");
    }
}