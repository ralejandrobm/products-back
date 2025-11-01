import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const conectionMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO);
        console.log(`Conección a mongo exitosa desde: ${conn.connection.host}`);
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1)
    }
}

export default conectionMongo;
