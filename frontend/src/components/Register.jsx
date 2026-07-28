import React, { useState } from 'react'
import styles from '../styles/register.module.css'
import API from './api'

const Register = () => {
    const [reginfo,setReginfo]=useState({
        name:"",
        email:"",
        password:"",
        confirm_password:""
    })
    const [error,setError]=useState({});
    const validate=()=>{
        const newerrors={};
        if (!reginfo.name.trim()) {
            newerrors.name="Name is required"
        }
         if(!reginfo.email.trim()){
            newerrors.email="Email is required"
        }
         if(!reginfo.password){
            newerrors.password="Password is required"
        }
         if(reginfo.password !== reginfo.confirm_password){
            newerrors.confirm_password="Password and confirm password must same"
        }
        return newerrors
    }
   
    const handlechange=(e)=>{
        setReginfo({...reginfo,
            [e.target.name]:e.target.value,
        })
    }
    const handlesubmit=async(e)=>{
         e.preventDefault();
         const validateError=validate();
         if(Object.keys(validateError).length>0){
            setError(validateError);
            return
         }
         const res=await API.post("/register",reginfo)
         console.log(res?.data?.message)
         
        }

  return (
    <>
        <div className={styles.container}>
            <form onSubmit={handlesubmit} className={styles.form}>
                 <h2 className={styles.heading}>Register form</h2>
                <input type="text" placeholder='Enter Name:' name="name"onChange={handlechange}/> 
                <p className={styles.error}>{error.name}</p>
                <input type="email" placeholder='Enter Email:'name="email"onChange={handlechange}/> 
                <p className={styles.error}>{error.email}</p>
                <input type="password"  placeholder='Enter Password:'name="password"onChange={handlechange} />
                <p className={styles.error}>{error.password}</p>
                <input type="password" placeholder='Enter Confirm Password:'name="confirm_password"onChange={handlechange}/>
                <p className={styles.error}>{error.confirm_password}</p>
                <button className={styles.btn}type="submit">Register</button>  
                {/* {res?"register successfull":"Register"} */}
            </form>
        </div>
    </>
  )
}
export default Register
