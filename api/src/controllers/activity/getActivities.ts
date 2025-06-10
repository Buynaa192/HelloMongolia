import { activityModel } from "../../models/activity.model";

export const GetActivity= async (req,res)=>{
    const activities=await activityModel.find({})
    
    return res.status(200).json({activities})
    
}