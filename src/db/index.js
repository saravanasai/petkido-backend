import mongoose from "mongoose";
export let dbInstance = undefined;
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`
    );
    dbInstance = connectionInstance;
    console.log(
      `\n☘️ MongoDB Connected!${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
