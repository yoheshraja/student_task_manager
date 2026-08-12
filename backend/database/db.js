import mongoose from "mongoose";

const dbconnect=()=>{
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("database connected")
    }
    catch(err){
        console.log("Error in the database connection :",err.message)
    }
    
}
export default dbconnect