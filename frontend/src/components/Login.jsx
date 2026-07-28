import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from './api';
import { profileContext } from './Authcontext';
import styles from '../styles/Login.module.css'
import '../index.css'
function Login() {
    const { user,setUser } = useContext(profileContext);
    const [Message,setMessage]=useState("");
    const [error,setError]=useState("");
    const Navigate = useNavigate();
    const [log, setLog] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setLog({
            ...log,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/login", log);
            localStorage.setItem("token", res?.data.token);
            setMessage(res.data.message)
            const checkProfile = await API.get("/profile/me");
            setUser(checkProfile?.data.student);
           setTimeout(()=>{
             if (checkProfile.data.student.studentprofile) {
                Navigate("/dashboard")
            }
            else {
                Navigate("/profile")
            }
           },2000)
        } catch (error) {
           setError(error.response?.data?.message);
        }

    }
    return (
        <div className={styles.LoginContainer}>
            <h2>Login</h2>
            <form action=""className={styles.Logform} onSubmit={handleSubmit}>
                <input type="text" placeholder='enter email' name='email' value={log.email} onChange={handleChange} required />
                <input type="text" placeholder='enter password' name='password' value={log.password} onChange={handleChange} required/>
                <button>Login</button>
                <span className={styles.DisplayInfo}>{Message?<span className='success'>{Message}</span>:<span className='error'>{error}</span>}</span>
            </form>
        </div>
    )
}

export default Login
