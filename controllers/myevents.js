const express=require('express');
const app=express();
const mongoose=require('mongoose');
const router=express.Router();
const events=require('../Models/events');
const checkauth=require('../Authentication/CheckAuth');

exports.GetMyEvents=(req,res)=>{
    const name=req.userData.username;
    events.find({user:name}).select('name date time venue user').then(result=>{
        res.status(200).json({result});
    })
    .catch(err=>{res.status(401).json(err)})
}

exports.deleteEvent=(req,res)=>{
    const id=req.body.id;
    // if(userData.username==)
    events.remove({_id:id}).exec().then(doc=>{res.status(200).json({doc,"Message":"Success"})})
    .catch(err=>{res.status(501).json({"Message":err})})
}

exports.updateEvent=(req,res)=>{
    const id=req.body.eventid;
    events.updateOne({_id:id},
        {
            $set:{
                name:req.body.eventname,
                date:req.body.eventdate,
                time:req.body.eventtime,
                venue:req.body.eventvenue,
            }
        }
    ).then(result=>{res.status(200).json({"Result":result})})
    .catch(err=>{res.status(400).json({"Message":err})})
}