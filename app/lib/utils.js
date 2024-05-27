import mongoose from "mongoose";
import dotenv from 'dotenv';

export const connecToDB = async () => {
  const connection = {};
  const dotenv = require("dotenv");
  dotenv.config({ path: "./config.env" });

  const DB = process.env.DATABASE;

  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(DB, {
      useUnifiedTopology:true,
      useNewUrlParser: true
    });
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw new Error(error);
  }
};
