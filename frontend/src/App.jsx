import React from 'react'
import Loader from './pages/loader'
import Login from './pages/Login'
import EmplyoeeDashboard from './pages/EmplyoeeDashboard'
import {Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/mainPage'


const App = () => {
  return (
    <div>
      <Loader />
      <Login /> 
      {/* <EmplyoeeDashboard/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/employee/dashboard' element={{/* <EmplyoeeDashboard/>}/>
        </Routes> */}
    </div>
  );
}

export default App
