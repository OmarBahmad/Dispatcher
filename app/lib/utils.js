import mongoose from "mongoose";
import dotenv from 'dotenv';

export const connecToDB = async () => {
  const connection = {};
  dotenv.config();

  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO, {
      useUnifiedTopology:true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw new Error(error);
  }
};
