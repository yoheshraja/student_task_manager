import { Router } from "express"
import { profileModel } from "../database/profile.js";
import studentmodel from "../database/student.js";

export const profileControl=async (req,res)=>{
    try {
        const {age,phone,address}=req.body;
        if (!age || !phone || !address || !req.file) {
            return res.status(400).json({
                success:false,
                message:"Fill All Fields"
            })
        }
    const profile=await profileModel.create({
        age,
        phone,
        address,
        profileImage:req.file.filename
    });
   
    await studentmodel.findByIdAndUpdate(req.stud.id,{studentprofile:profile._id,profileCompleted:true},{new:true});
    res.status(200).json({
        success:true,
        message:"profile created",
        profile
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"server error"
        })
    }
} 
export const getprofile=async (req,res)=>{
    try {
        
        const student=await studentmodel.findById(req.stud.id).populate("studentprofile","-__v");
        res.status(200).json({
            success:true,
            student
        })
    } catch (error) {
        console.log(error)
         res.status(500).json({
            success:false,
            message:"server error"
        })
    }

}