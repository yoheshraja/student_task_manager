import { Router } from "express"
import { profileModel } from "../database/profile.js";
import studentmodel from "../database/student.js";
import supabase from "../config/supabase.js";
export const profileControl = async (req, res) => {
    try {

        const { age, phone, address } = req.body;

        if (!age || !phone || !address || !req.file) {
            return res.status(400).json({
                success: false,
                message: "Fill All Fields"
            });
        }

        const fileName = Date.now() + "-" + req.file.originalname;

        const { data, error } = await supabase.storage
            .from("student-profile-images")
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype
            });

        if (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Image upload failed"
            });
        }

        const { data: publicUrlData } = supabase.storage
            .from("student-profile-images")
            .getPublicUrl(fileName);

        const profile = await profileModel.create({
            age,
            phone,
            address,
            profileImage: publicUrlData.publicUrl
        });

        await studentmodel.findByIdAndUpdate(
            req.stud.id,
            {
                studentprofile: profile._id,
                profileCompleted: true
            },
            {
                new: true
            }
        );

        res.status(200).json({
            success: true,
            message: "profile created",
            profile
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "server error"
        });
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