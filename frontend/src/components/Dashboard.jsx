import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CrudTask from './CrudTask';
import styles from '../styles/Dashboard.module.css'
import { useContext } from 'react';
import { profileContext } from './Authcontext';
import { useSearchParams } from 'react-router-dom';
import API from './api';
import { useEffect } from 'react';
function Dashboard() {
  // const location = useLocation();
  const Navigate = useNavigate();
  const { user } = useContext(profileContext);
  const [showCard, setShowCard] = useState(false);
  const [SearchParams, setSearchParams] = useSearchParams("");
  const [searchList, setSearchList] = useState([]);
  const ProfileCard = () => {
    setShowCard(!showCard);
  }
  const logout = () => {
    localStorage.removeItem("token")
    setTimeout(() => { setUser(null); Navigate("/login") }, 1000)
  }


  const [search, setSearch] = useState("");
  useEffect(()=>{
     const Search_fun = async () => {
    setSearchParams({ search });
    try {
      if (!search.trim()) {
        return;
      }
      const getSearchData = await API.get(`/tasks/search?search=${search}`);
      setSearchList(getSearchData.data.tasks)
    } catch (error) {
      alert(error.message)
    }
  }
  Search_fun()
  },[search])
 
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div className={styles.leftSection}>
            <div className={styles.profile}><img
              src={`http://localhost:3000/uploads/${user?.studentprofile?.profileImage}`} alt="Profile" onClick={ProfileCard} />
            </div>
            {showCard && <div className={styles.opencard}>
              <div className={styles.Image}>
                <img src={`http://localhost:3000/uploads/${user?.studentprofile?.profileImage}`} alt="" />
              </div>
              <p>Name:{user.name}</p>
              <p>Email:{user.email}</p>
              <p>Age:{user.studentprofile.age}</p>
              <p>Address:{user.studentprofile.address}</p>
              <button onClick={logout}>Logout</button>
            </div>}
            <h2>welcome, {user?.name} </h2>
          </div>
          <form className="d-flex">
            <input className="form-control me-2" type="search" name='search' value={search} placeholder="Search"
              aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
          </form>
        </div>
      </nav>
      <div className={styles.DashboardMain} >
        {/* <p>{getSearchData.data.message}</p> */}
        {/* {searchList?searchList.map((task)=>(
          <div key={task._id}> 
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.dueDate}</p>
            <p>{task.priority}</p>
          </div>
        )):<CrudTask/>} */}

        {/* {searchList.length===0?<p>Task Not Found</p>: */}
        {search.trim()===""?<CrudTask />:
        searchList.length > 0 ? searchList.map((task) => (
          <div  key={task._id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.dueDate}</p>
            <p>{task.priority}</p>
          </div>
        )):<p className={styles.notFound}>Task Not Found</p> }
      </div>

    </>
  )
}

export default Dashboard
