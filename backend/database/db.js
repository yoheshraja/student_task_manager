import mongoose from "mongoose";

const dbconnect=()=>{
    try{
        mongoose.connect("mongodb://localhost/Student_task_manager");
        console.log("database connected")
    }
    catch(err){
        console.log("Error in the database connection :",err.message)
    }
    
}
export default dbconnect