import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1); // अगर DB ना जुड़े तो app ना चले
    }
};

export default connectDB;
