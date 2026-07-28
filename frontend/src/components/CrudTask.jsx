import React, { useState } from 'react'
import styles from '../styles/CrudTask.module.css'
import API from './api';
import { useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';
function CrudTask() {
    const [Message,setMessage]=useState("");
    const [error,setError]=useState("");
    const [searchParams,setSearchParams]=useSearchParams();
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: ""
    });
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const [totalPage,setTotalPage]=useState(0);
    const [previous,setPrevious]=useState(false);
    const [next,setNext]=useState(true);
    const [taskList, setTaskList] = useState([]);
    const [editId,setEditId]=useState(null);
    useEffect(() => {
         getTask()
    }, [searchParams])
    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/tasks", task);
            setMessage(res?.data?.message)
            setTask({                       //efficient code ?
                title: "",
                description: "",
                dueDate: "",
                priority: "",
            });
            setTaskList((prev)=>[...prev,res.data.saveTask])
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }
    // const getTask = async () => {
    //             try {
    //                 const res = await API.get("/tasks");
    //                 setTaskList(res?.data.tasks); 
    //             } catch (error) {
    //                 alert(error?.res?.data.message || error.message)

    //             }
    //         }
          const getTask = async () => {
                try {
                    console.log("getTask RENDER")
                    const res = await API.get(`/tasks?page=${page}&limit=${limit}`);
                    setTaskList(res?.data?.getTask); 
                    setTotalPage(res?.data.totalPage);
                    setPrevious(res?.data.previous);
                    setNext(res?.data.next)
                } catch (error) {
                    alert(error?.res?.data.message || error.message)

                }
            }
        const updateTask=async (e) => {
            e.preventDefault();
            try {
                const res=API.put(`/tasks/update/${editId}`,task);
                setMessage(res.data.message)
            } catch (error) {
                setError(error?.res?.data?.message)
            }
        }
        const handleUpdate=(editTask)=>{
            setTask({
                title:editTask.title,
                description:editTask.description,
                dueDate:editTask.dueDate.split("T")[0],
                priority:editTask.priority
            })
            setEditId(editTask._id)
        }
         const handleDelete=async (id) => { 
            try {
                const res=await API.delete(`/tasks/delete/${id}`);
                setMessage(res.data.message);
                setTaskList((p)=>p.filter((items)=>items._id!==id))
            } catch (error) {
                setError(error?.res?.data?.message)
            }
        }
        
        if (task.description.length >200) {
            alert("description must contain 200 characters")
            return
        }
        const Previous=()=>{
            if (page>1) {
                setSearchParams({
                    page:page-1,
                    limit
                })
            }
        }
        const Next=()=>{
           if (page<totalPage) {
             setSearchParams({
                page:page+1,
                limit
            })
           }
        }
        console.log("entire component RENDER")
    return (
        <>
            <div className={styles.TaskFormContainer}>
                <form onSubmit={editId?updateTask:handleSubmit} className={styles.TaskForm} >
                <input type="text" placeholder='Enter title:' name="title" value={task.title} onChange={handleChange} />
                <textarea rows={3} cols={40} type="text" placeholder='Enter description:' name="description"value={task.description} onChange={handleChange}></textarea>
                <input type="date" name="dueDate"value={task.dueDate} onChange={handleChange} />
                <select name="priority" value={task.priority} onChange={handleChange}>
                    <option value="">select priority</option>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
            {editId?<button>update</button>:<button>Submit</button>}
            </form>
            </div>
            {setTimeout(()=>{<span className={styles.DisplayInfo}>{Message?<span className='success'>{Message}</span>:<span className='error'>{error}</span>}</span>},2000)}
            <div>
                <h4>Tasks</h4>
                <div className={styles.TaskContainer}>
                    {taskList.map((e,index) => (
                    <div className={styles.TaskCard}key={e._id}>
                        <p>Task :{index+1}</p>
                        <h3>Ttile:{e.title}</h3>
                        <p className={styles.description}>Description:{e.description}</p>
                        <p>DueDate:{e.dueDate}</p>
                        <p>Priority:{e.priority}</p>
                        <button onClick={()=>handleUpdate(e)}>update</button>
                        <button onClick={()=>handleDelete(e._id)}>Delete</button>
                        <br />
                    </div>
                ))}
                </div>
                   <div className={styles.BtnGroup}>
                    <button onClick={Previous} disabled={!previous}>previous</button>
                    {Array.from({length:totalPage},(_,index)=>(
                    <button 
                     key={index}
                     onClick={()=>{setSearchParams({page:index+1,limit:10})}}
                    >{index+1}</button>
                   ))}
                   <button onClick={Next} disabled={!next}>next</button>
                   </div>
            </div>
        </>
    )
}

export default CrudTask
