import { model, Schema } from "mongoose";
const destinationItemSchema=new Schema ({
    activity:{type:Schema.Types.ObjectId,ref:"activity",required:true}
})
const destinationSchema= new Schema ({
    destinationName:{type:String, required:true},
    destinationImages:{type:String,required:true},
    region:{type:String ,enum:["Gobi","Hangai","Zuun bus","Baruun bus"], required:true},
    description:{type:String ,required:true},
    activities:{type:[destinationItemSchema] ,default:[]},
    updatedAt:{type:Date ,required:true},
    createdAt:{type:Date,required:true}
})
export const destinationModel=model("destination",destinationSchema)