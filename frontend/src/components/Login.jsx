import React, { useContext, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import API from './api';
import { profileContext } from './Authcontext';
import styles from '../styles/Login.module.css'
import '../index.css'
function Login() {
    const { user,setUser } = useContext(profileContext);
    const [Message,setMessage]=useState("");
    const [error,setError]=useState("");
    const Navigate = useNavigate();
    const[loading,setloading]=useState(false);
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
            setloading(true)
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
        }finally{
            setloading(false)
        }

    }
    return (
        <div className={styles.LoginContainer}>  
            <form action=""className={styles.Logform} onSubmit={handleSubmit}>
                <Link to="/home" className={styles.homeLink}>Home</Link>
                <h2>Login</h2>
                <input type="text" placeholder='enter email' name='email' value={log.email} onChange={handleChange} required />
                <input type="text" placeholder='enter password' name='password' value={log.password} onChange={handleChange} required/>
                <button>{loading?"Loading...":"Login"}</button>
                <p>Don't Have Account <Link to={"/register"}>Register</Link></p>
                <span className={styles.DisplayInfo}>{Message?<span className='success'>{Message}</span>:<span className='error'>{error}</span>}</span>
            </form>
        </div>
    )
}

export default Login
