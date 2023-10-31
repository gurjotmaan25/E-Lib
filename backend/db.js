import { mongoose } from "mongoose";
const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to mongodb');
    } catch (error) {
        console.log(`mongo error ${error}`);
    }
}

export default connectDB;
