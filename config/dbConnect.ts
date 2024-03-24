import mongoose from "mongoose";

let dbConnected = false;

const dbConnect = () => {
  if (dbConnected) {
    console.log("DB already connected");
    return;
  }

  try {
    mongoose.set({ strictQuery: true });
    mongoose.connect(process.env.MONGO_URL as string);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
