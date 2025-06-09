import { destinationModel } from "../../models/destination.model"

export const GetDestinations= async (req,res)=>{
    const destinations=await destinationModel.find({})
    
    
    return res.status(200).json({destinations})
    
}