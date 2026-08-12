import React, { useState } from 'react'
import API from './api';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { profileContext } from './Authcontext';
import styles from '../styles/Profile.module.css'
function Profile() {
  const { user } = useContext(profileContext)
  const Navigate = useNavigate();
  const [profile, setProfile] = useState({
    age: "",
    phone: "",
    address: ""
  });
  const [image, SetImage] = useState("");
  const [Message,setMessage]=useState("");
  const [Error,setError]=useState("")
  const [loading,setLoading]=useState(false)

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }
  const handleImage = (e) => {
    SetImage(e.target.files[0]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("age", profile.age)
      formData.append("phone", profile.phone)
      formData.append("address", profile.address)
      formData.append("image", image)
      const res = await API.post("/profile", formData)
      setMessage(res?.data?.message)
      setTimeout(()=>{
        Navigate("/dashboard")
      },2000)
    } catch (error) {
      setError(error?.response?.data?.message);
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className={styles.profileContainer}>

      <form action="" onSubmit={handleSubmit} className={styles.profileForm}>
        <h2>Profile Form</h2>
        <input type="age" placeholder='Enter Age:' name='age' onChange={handleChange} />
        <input type="number" placeholder='Enter phone No:' name="phone" id="" onChange={handleChange} />
        <input type="text" placeholder='Enter Address:' name="address" onChange={handleChange} />
        <input type="file" onChange={handleImage} />
        <button>{loading?"Loading...":"Submit"}</button>
        <span className={styles.message}>{Message?<span className='success'>{Message}</span>:<span className="error">{Error}</span>}</span>
      </form>
      
    </div>
   
  )
}


export default Profile
