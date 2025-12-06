import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection successful!");
  } catch (error) {
    console.log("Connection failed:", error);
  }
};

export default connectDB;
