import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const coonecctDB = async() =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: 
        ${connectionInstance.conection.host}`)
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
    }
}

export default coonecctDB
