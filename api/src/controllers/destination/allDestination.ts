import { destinationModel } from "../../models/destination.model"

export const GetDestinations= async (req,res)=>{
    const {destinationId}=req.query
    const destinations=await destinationModel.find({})
    console.log("asdasdsd",destinations);
    
    return res.status(200).json({destinations})
    
}