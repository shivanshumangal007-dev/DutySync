import React from 'react'
import Loader from './pages/loader'
import Login from './pages/Login'
import EmplyoeeDashboard from './pages/EmplyoeeDashboard'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AdminDashboard from './pages/adminDashboard'


const App = () => {
  return (
    <div>
      {/* <Loader />
      <Login />  */}
      {/* <EmplyoeeDashboard/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/employee/dashboard' element={{/* <EmplyoeeDashboard/>}/>
        </Routes> */}
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/employee/dashboard' element={<EmplyoeeDashboard/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App
