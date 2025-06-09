import { RequestHandler } from "express";
import { destinationModel } from "../../models/destination.model";

export const deleteDestination:RequestHandler=async(req,res)=>{
    try {
        const {id}=req.body
        const result=await destinationModel.deleteOne({
            _id:id
        })
        if(result.deletedCount===0){res.status(404).json({message:"destination oldsongui"})
        return
        }
        res.status(200).json({message:"ustgagdsn"})
    } catch (error) {
        res.status(500).json({message:"hud2"})
        
    }
}