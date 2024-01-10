import express from "express";
import { config } from "dotenv";
import cors from "cors"


import cakeRouter from "./Routes/cake.js";
import userRouter from "./Routes/user.js"

import{connectToDB} from "./Config/dbConfig.js";

config();
const app = express();
connectToDB();

    app.use(express.json())
    app.use(cors({}))
    
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