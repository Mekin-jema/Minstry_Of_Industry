// db/connect.js
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  try {
    const mongo_url = process.env.MONGO_URL;
    await mongoose.connect(mongo_url);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:',err.message);
    process.exit(1);
  }
};

export default connectDB;