import { useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'
import Protected from './components/Protected'
import Profile from './components/Profile'
import Home from './components/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route element={<Protected/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
