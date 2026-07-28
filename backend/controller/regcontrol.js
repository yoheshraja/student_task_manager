import { Router } from "express"
import studentmodel from "../database/student.js";
import bcrypt from "bcryptjs";
 const regcontrol=async(req,res)=>{
        const {name,email,password,confirm_password}=req.body
    try{
        const hashedpassword=await bcrypt.hash(password,10)
    const student=new studentmodel({name,email,password:hashedpassword,confirm_password});

    await student.save();

        res.status(201).json({
        success:true,
        message:"registered successfully"
    })
    }catch(error){
        res.status(401).json({
        success:false,
        message:"Error in registration"
        })
    }
    
}
export default regcontrol