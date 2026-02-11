import Loader from './pages/Loader'
import Login from './pages/Login'
import EmplyoeeDashboard from './pages/EmplyoeeDashboard'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminMainDashboard from './pages/AdminMainDashboard'
import { useEffect } from "react";
import axios from "axios";

const App = () => {


  useEffect(() => {
    axios.get("/csrf/");
  }, []);
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
        <Route path="/" element={<MainPage />} />
        <Route path="/employee/dashboard" element={<EmplyoeeDashboard />} />
        <Route path="/admin/dashboard" element={<AdminMainDashboard />} />
        <Route path="/admin/addtask" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App
