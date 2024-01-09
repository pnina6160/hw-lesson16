import mongoose from "mongoose";

export const connectToDB=async()=>{
    try{
        let con=await mongoose.connect(process.env.DB_CONNECTION);
        console.log("mongoDB succee",con.connection.host);
    }
    catch(err){
        console.log("cannot connect mongoDB");
        console.log(err);
        process.exit(1);
    }
}