import { Schema, model } from "mongoose";
const packageItemSchema = new Schema({
    order:{
    type:Number,
    required: true,
    },
 title:{
    type:String,
    required: true,
 },
 image:{
    type:String,
    required: true,
 },
    destinationId:{
        type: Schema.Types.ObjectId,
        ref: "destination",
        required: true,

    },
 description:{
    type:String,
    required: true,
 },
 activity:{
    type: [Schema.Types.ObjectId],
    ref: "activity",
    default: [],
 },
 accomodation:{
    type:String,
    required: true,
 },

  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
 
});
export const packageItemModel = model("packageItem",packageItemSchema);