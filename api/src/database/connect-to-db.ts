import { connect } from "mongoose";
export const connectToDatabase = async () => {
  await connect(
    "mongodb+srv://hellomongolia5:ZPHbB7WApx2MSsrz@hellomongolia.cgxsbir.mongodb.net/?retryWrites=true&w=majority&appName=HelloMongolia"
  );
  console.log("Connect to database");
};