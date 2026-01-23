import React, { useEffect, useState } from "react";
import TaskDiv from "../components/TaskDIv";
import TaskData from "../components/TaskData";
import axios from "axios";

const EmplyoeeDashboard = () => {
  const [name, setName] = useState("");
  const [task, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  // useState
  useEffect(() => {
    async function getData() {
      // let response;
      try {
        const response = await axios.get("http://127.0.0.1:8000/task/", {
          withCredentials: true,
        });

        // console.log(response.data.userDetails.username);
        setName(response.data.userDetails.username);
        setTasks(response.data.tasks);
        setStats(response.data.stats);

        // console.log(name);
        // console.log(task);
      } catch (error) {
        console.log("error infetching data", error);
      }
    }
    
    getData();
  }, []);
  
  return (
    <div className="employeeMainDiv">
      <h1>hello, {name}👋</h1>
      {/* {console.log(name, task, stats)} */}

      {/* <div className="tasksData">
        <div className="taskInfo">
          <h1>10</h1>
          <h2>completed</h2>
        </div>
        <div className="taskInfo">
          <h1>20</h1>
          <h2>assigned</h2>
        </div>
        <div className="taskInfo">
          <h1>1</h1>
          <h2>in Progress</h2>
        </div>
        <div className="taskInfo">
          <h1>40%</h1>
          <h2>progress</h2>
        </div>
      // </div> */}
      <TaskData stats = {stats}/>


      <TaskDiv tasks = {task}/>
    </div>
  );
};

export default EmplyoeeDashboard;
