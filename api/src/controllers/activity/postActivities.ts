import { RequestHandler } from "express";
import { activityModel } from "../../models/activity.model";

export const postActivity:RequestHandler=async(req , res)=>{
    try{
    const {emoji,activityName}= req.body;
    await activityModel.create({
        emoji,
        activityName,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    res.status(201).json({
        message:"Success",
    });
}catch(error){
    res.status(500).json({
        message:"error"
    })
}
};