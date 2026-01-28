import React from 'react'
import Login from './Login'
import Loader from './loader'
import AdminDashboard from './adminDashboard'

const MainPage = () => {
  return (
    <div>
      <Loader/>

      <Login/>

      {/* <AdminDashboard/> */}
    </div>
  )
}

export default MainPage
