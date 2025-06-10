import { destinationModel } from "../../models/destination.model"

export const GetDestinations= async (req,res)=>{
  try {
    const {destinationId}=req.query
      const destinations=await destinationModel.find(destinationId ? {_id:destinationId}: {})
      .populate("activity")
  
    
    return res.status(200).json({destinations})
  } catch (error) {
    res.status(500).json({message:"fail"})
  }
    
}