import React, { useState } from 'react'
import styles from '../styles/CrudTask.module.css'
import API from './api';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
function CrudTask() {
    const [Message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: ""
    });
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "asc";
    const filter = searchParams.get("filter") || "";
    const [totalPage, setTotalPage] = useState(0);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(true);
    const [taskList, setTaskList] = useState([]);
    const [editId, setEditId] = useState(null);
    const updateParams=(newparams)=>{
        setSearchParams({
            page:newparams.page ?? 1,
            limit:newparams.limit ?? 10,
            ...(newparams.search && {search:newparams.search}),
            ...(newparams.sort && {sort:newparams.sort}),
            ...(newparams.filter && {filter:newparams.filter})
        })
    }
    useEffect(() => {
        getTask()
    }, [searchParams])
    useEffect(() => {
        if (Message || error) {
            const timer = setTimeout(() => {
                setMessage("");
                setError("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [Message, error])
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
            setMessage(res.data?.message)
            setTask({                       //efficient code ?
                title: "",
                description: "",
                dueDate: "",
                priority: "",
            });
            setTaskList((prev) => [...prev, res.data.saveTask])
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }
    const getTask = async () => {
        try {
            setLoading(true)
            const res = await API.get(`/tasks?page=${page}&limit=${limit}&search=${search}&sort=${sort}&filter=${filter}`);
            setTaskList(res?.data?.getTask);
            setTotalPage(res?.data.totalPage);
            setPrevious(res?.data.previous);
            setNext(res?.data.next);
        } catch (error) {
            setError(error?.res?.data.message)

        } finally {
            setLoading(false)
        }
    }
    const updateTask = async (e) => {
        e.preventDefault();
        try {
            const res = await API.put(`/tasks/update/${editId}`, task);
            setMessage(res.data.message)
            setTaskList(prev =>prev.map(item =>item._id === editId? res.data.updatedData: item));
        } catch (error) {
            setError(error?.res?.data?.message)
        }
    }
    const handleUpdate = (editTask) => {
        setTask({
            title: editTask.title,
            description: editTask.description,
            dueDate: editTask.dueDate.split("T")[0],
            priority: editTask.priority
        })
        setEditId(editTask._id)
    }
    const handleDelete = async (id) => {
        try {
            const res = await API.delete(`/tasks/delete/${id}`);
            setMessage(res.data.message);
            setTaskList((p) => p.filter((items) => items._id !== id))
        } catch (error) {
            setError(error?.res?.data?.message)
        }
    }
    const handleComplete=async(id)=>{
       try {
            const res=await API.put(`/tasks/update/${id}`,{
                status:"completed"
            })
            setMessage(res?.data?.message)
            //  setTaskList((prev) => [...prev, res.data.saveTask])
            setTaskList((prev) =>
            prev.map((task) =>
            task._id === id
            ? { ...task, status: res.data.updatedData.status }
            : task
        )
    );
        } catch (error) {
            setError(error?.response.data.message)
        }
    }
    const Previous = () => {
        if (page > 1) {
            updateParams({
                page: page - 1,
                limit,
                search,
                sort,
                filter
            })
        }
    }
    const Next = () => {
        if (page < totalPage) {
            updateParams({
                page: page + 1,
                limit,
                search,
                sort, 
                filter
            })
        }
    }
    return (
        <>
        <span className={styles.DisplayInfo}>{Message ? <span className='alert alert-success'>{Message}</span> : <span className='alert alert-error'>{error}</span>}</span>
            <div className={styles.box}>
                <div>
                    <form action=""><h3>SORT</h3>
                        <select name="sort" value={sort} onChange={(e) => updateParams({ page: 1, limit, search, sort: e.target.value,filter })}>
                            <option value="">Select Filter</option>
                            <option value="asc">Assending</option>
                            <option value="desc">Dessending</option>
                        </select>
                    </form>
                </div>
                <form action=""><h3>FILTER</h3>
                    <select value={filter} onChange={(e) => updateParams({ page: 1, limit, search, sort, filter: e.target.value })}>
                        <option value="">Select Filter</option>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                </form>
            </div>
            <div className={styles.TaskFormContainer}>
                <form onSubmit={editId ? updateTask : handleSubmit} className={styles.TaskForm} >
                    <input type="text" placeholder='Enter title:' name="title" value={task.title} onChange={handleChange} />
                    <div className="discriptionField"><textarea rows={3} cols={36} maxLength={200} type="text" placeholder='Enter description:' name="description" value={task.description} onChange={handleChange}></textarea><p className={styles.desCount}>{task.description.length}/200</p></div>
                    <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
                    <select name="priority" value={task.priority} onChange={handleChange}>
                        <option value="">select priority</option>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                    {<button>{editId ? "Update" : "Submit"}</button>}
                </form>
            </div>
            {/* {!search && (setError(getTask.res?.data?.message))} */}
            {/* task cards */}
            <div>
                <h4>Tasks</h4>
                <div className={`${styles.TaskContainer} ${
                taskList.length % 4 === 2 ? styles.twoLastCards : ""}`}>
                    {/* <div className={styles.loading}><p>Loading...</p></div> */}
                    {loading ? (<div className={styles.spinnerContainer}><div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div></div>) :taskList.length===0?<p>Task Not Found</p>: taskList.map((e) => (
                        <div className={styles.TaskCard} key={e._id}>
                            <h3>Ttile:{e.title}</h3>
                            <p className={styles.description}>Description:{e.description}</p>
                            <p>DueDate:{e.dueDate.split("T")[0]}</p>
                            <p>Priority:{e.priority}</p>
                            <p>status:{e.status}</p>
                            <div className={styles.cardBtn}>
                                <button onClick={() => handleUpdate(e)}>update</button>
                                <button onClick={() => handleDelete(e._id)} className={styles.right}>Delete</button>
                                <button onClick={()=>handleComplete(e._id)}className={styles.right}>Completed</button>
                            </div>
                            <br />
                        </div>
                    ))}
                </div>
                {/* pagination button */}
                <div className={styles.BtnGroup}>
                    <button onClick={Previous} disabled={!previous}>previous</button>
                    {Array.from({ length: totalPage }, (_, index) => (
                        <button
                            key={index}
                            className={page === index + 1 ? styles.activePage : ""}
                            onClick={() => { updateParams({page: index + 1, limit: 10,search,sort,filter }) }}
                        >{index + 1}</button>
                    ))}
                    <button onClick={Next} disabled={!next}>next</button>
                </div>
            </div>
        </>
    )
}

export default CrudTask
