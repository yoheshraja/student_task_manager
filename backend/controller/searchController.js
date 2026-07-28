import { Router } from "express";
import taskModel from "../database/task.js";
export const searchController = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            res.status(404).json({
                success: false,
                message: "please enter search value"     //task not found
            })
        }
        const tasks = await taskModel.find({ userId: req.stud.id, title: { $regex: search, $options: "i" } });

      
        res.status(200).json({
            success: true,
            tasks
        })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: true,
            message: "server error"
        })
    }
}