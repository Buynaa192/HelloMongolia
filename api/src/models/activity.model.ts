import { model, Schema } from "mongoose";

const activitySchema= new Schema ({
    emoji:{type:String, required:true},
    activityName:{type:String,required:true},
    updatedAt:{type:Date ,required:true},
    createdAt:{type:Date,required:true}
})
export const activityModel=model("activity",activitySchema) 