import { activityModel } from "../../models/activity.model";

export const putActivity=async(req , res)=>{
    try{
    const {emoji, activityName, activityId}= req.body;
    await activityModel.updateOne(activityId, {
        emoji,
        activityName,
        updatedAt: new Date(),
    });
    res.status(201).json({
        message:"Put Success",
    });
    }catch(error){
        res.status(500).json({
            message:"error"
        })
    }
};