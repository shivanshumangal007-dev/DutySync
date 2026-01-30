import React from 'react'
import Login from './Login'
import Loader from './Loader'

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
