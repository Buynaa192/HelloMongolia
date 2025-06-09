import { connect } from "mongoose";
export const connectToDatabase = async () => {
  await connect(
    "mongodb+srv://admin:Ttt201212@cluster0.nke4zb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connect to database");
};