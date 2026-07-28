import React, { createContext, useState,useEffect } from 'react'
import API from './api';
export const profileContext=createContext();
function Authcontext({children}) {
    const [user,setUser]=useState(null);
    useEffect(() => {
    const loadUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await API.get("/profile/me");
            setUser(res.data.student);
        } catch (error) {
            console.log(error);
        }
    };
    loadUser();
}, []);
useEffect(() => {
}, [user]);
  return (
    <profileContext.Provider value={{user,setUser}}>
        {children}
    </profileContext.Provider>
  )
}

export default Authcontext
