import { Schema, model } from "mongoose";
const packageSchema = new Schema({
    owner:{
    type: Schema.Types.ObjectId,
    ref: "companyProfile",
    required: true,
    },
 coverPhoto:{
    type:String,
    required: true,
 },
 description:{
    type:String,
    required: true,
 },
 packageItem:[{
     type:String,
    required: true,
 }],
 duration:{
    type:String,
    required: true,
 },
 availableFrom:{
    type:Date,
    required: true,
 },
  availableUntil:{
    type:Date,
    required: true,
 },
 cost:{
    type: Number,
    default:0
    
  },
  itinerary: {
   data: {
     type: Buffer,
     required: true
   },
   contentType: {
     type: String,
     required: true
   }
 },
tripType:{
type: String,
    enum: ["Sightseeing", "Adventure","Culture & history","Family vacations","Scientific","Festival & Events"],
    default: "Adventure",
},
rating:{
    type:Number,
    required: true,
    min: 0,
    max: 5,
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
export const packageModel = model("package",packageSchema);