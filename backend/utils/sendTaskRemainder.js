import studentmodel from '../database/student.js';
import taskModel from '../database/task.js'
import transporter from '../config/mail.js'

export const sendTaskRemainder=async ()=>{
    try {
        const tasks=await taskModel.find({status:"pending",}).populate("userId");
        for(const task  of tasks){
            const today=new Date();
            const dueDate=new Date(task.dueDate)
            const difference=dueDate-today
            const daysLeft=Math.ceil(difference/(1000*60*60*24))

            if (daysLeft===3 && !task.remainderSent.includes(3)) {
                const info=await transporter.sendMail({
                    from:process.env.EMAIL_USER,
                    to:task.userId.email,
                    subject:"Task Remainder -3 Days Left",
                    text:`Your Task "${task.title}" is Due in 3 Days`
                })
                   await taskModel.findByIdAndUpdate(task._id,{$push:{remainderSent:3}})
            }
            if (daysLeft===1 && !task.remainderSent.includes(1)) {
                await transporter.sendMail({
                    from:process.env.EMAIL_USER,
                    to:task.userId.email,
                    subject:"Task Remainder -1 Days Left",
                    text:`Your Task "${task.title}" is Due in 1 Days`
                })
                await taskModel.findByIdAndUpdate(task._id,{$push:{remainderSent:1}})
            }
            if (daysLeft===0 && !task.remainderSent.includes(0)) {
                await transporter.sendMail({
                    from:process.env.EMAIL_USER,
                    to:task.userId.email,
                    subject:"Task Due Today",
                    text:`Your Task "${task.title}" is Due today`
                })
                await taskModel.findByIdAndUpdate(task._id,{$push:{remainderSent:0}})
            }
        }
    } catch (error) {
        console.log("Remainder Error: ",error)
    }
}