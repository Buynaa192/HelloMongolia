import { RequestHandler } from "express"
import { activityModel } from "../../models/activity.model"

export const deleteActivity:RequestHandler=async(req, res)=>{
    try{
        const {activityId}=req.body
        const result=await activityModel.deleteOne({
            _id:activityId
        })
        if(result.deletedCount===0){
            res.status(404).json({message:"not found"})
        }
        res.status(200).json({message:"success"})
    }catch(error){
        res.status(500).json({message:"Error"})
    }
}