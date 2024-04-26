//require ('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: '/.env'
})

connectDB()
.than(() =>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`server is running port : ${process.env.PORT}`)
    })
})
.catch(() =>{
    console.log("MONGODB db connection failed !!!, err")
})






/*
import { Express } from "express";
const app = express()
// this is one method to write the function and execute
function connectDB(){}
connectDB()// the code are  execute 

// second methodd to write the function and execute by arrow function
// write the code to connection stablish in database
(async() =>{
try {
   await mongoose.connect(`${process.env.
    MONGODB_URL}/${DB_NAME}`)
    app.on("error", (error) =>{
        console.log("ERRR", error);
        throw error
    })

    app/listen(process.env.PORT, () =>{
        console.log(`app is listening on port ${process.env.PORT} `)
    })
} catch (error) {
    console.error("ERROR", error)
    throw err
}
})() */

