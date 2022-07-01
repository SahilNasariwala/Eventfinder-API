const express=require('express');
const app=express();
const mongoose=require('mongoose');
const router=express.Router();
const events=require('../Models/events');
const checkauth=require('../Authentication/CheckAuth');

exports.getEvents=(req,res)=>{
    events.find().select('-_id name date time venue user')
    .then(result=>{res.status(200).json({result})})
    .catch(err=>{res.status(401).json({err})})
}

exports.findEvent=(req,res)=>{
    events.find({$or:[{name:req.body.searchByEvent},
        {venue:req.body.searchByVenue},{user:req.body.searchByUser}]})
    .select('-_id -__v')
    .then(result=>{res.status(200).json({result})})
    .catch(err=>{res.status(500).json({err})})
}

exports.postEvents=(req,res)=>{
    const event=new events({
        _id:mongoose.Types.ObjectId(),
        name:req.body.eventname,
        date:req.body.eventdate,
        time:req.body.eventtime,
        venue:req.body.eventvenue,
        user:req.userData.username,
    })
    event.save()
    .then(result=>{res.status(200).json({result})})
    .catch(err=>{res.status(401).json({err})})
}