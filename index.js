import express from "express";
import { config } from "dotenv";


import cakeRouter from "./Routes/cake.js";
import userRouter from "./Routes/user.js"

import{connectToDB} from "./Config/dbConfig.js";

config();
const app = express();
connectToDB();
// import morgan from "morgan";
// import mongoose from "mongoose";
// const mongoURI = process.env.DB_CONNECTION || "mongodb://0.0.0.0:5000";
// mongoose.connect(`${mongoURI}/${process.env.DB_NAME||"bakery"}`)
// // mongoose.connect(`mongodb://0.0.0.0:27017/bakery`, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // })
//     .then(suc => {
//         console.log("mongoDB connected on host" + suc.connection.host);
//     })
//     .catch(err => {
//         console.log(err)
//         console.log("canמot connect to mongoDb");
//         process.exit(1);
//     })
// app.use(morgan("common"))
    app.use(express.json())
    
    app.use("/api/cake", cakeRouter);
    app.use("/api/user", userRouter);


    app.use((err,req,res,next)=>{
        console.error(err.stack);
        let statusCode=res.statusCode?res.statusCode:500;
        res.status(statusCode).send(err.message||"error in server");
    })

let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listeningon port ${port}`)
})