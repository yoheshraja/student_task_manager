import React, { useState } from 'react'
import API from './api';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { profileContext } from './Authcontext';
function Profile() {
  const { user } = useContext(profileContext)
  const Navigate = useNavigate();
  const [profile, setProfile] = useState({
    age: "",
    phone: "",
    address: ""
  });
  const [image, SetImage] = useState("");

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }
  const handleImage = (e) => {
    e.preventDefault();
    SetImage(e.target.files[0]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("age", profile.age)
      formData.append("phone", profile.phone)
      formData.append("address", profile.address)
      formData.append("image", image)
      const res = await API.post("/profile", formData)
      alert(res?.data?.message)
      // console.log("user",user)
      Navigate("/dashboard", { state: { username: user.name } })
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="age" placeholder='Enter Age:' name='age' onChange={handleChange} />
        <input type="number" placeholder='Enter phone No:' name="phone" id="" onChange={handleChange} />
        <input type="text" placeholder='Enter Address:' name="address" onChange={handleChange} />
        <input type="file" onChange={handleImage} />
        <button>Submit</button>
      </form>
    </div>
  )
}


export default Profile
