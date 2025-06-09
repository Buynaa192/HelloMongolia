import { RequestHandler } from "express";
import { destinationModel } from "../../models/destination.model";

export const CreateDestination:RequestHandler=async (req,res)=>{
    try{
        const {destinationName,destinationImages,region,description,activities}=req.body
        const newDestination= await destinationModel.create({
            destinationName,
            destinationImages,
            region,
            description,
            activities,
            createdAt:new Date(),
            updatedAt:new Date()
        })
        res.status(200).json(newDestination)
    }
    catch(error){
        console.log(error)
    }
    
}