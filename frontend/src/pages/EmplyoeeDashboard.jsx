import React, { useEffect, useState } from "react";
import TaskDiv from "../components/TaskDIv";
import TaskData from "../components/TaskData";
import axios from "axios";

const EmplyoeeDashboard = () => {
  const [name, setName] = useState("");
  const [task, setTasks] = useState([]);
  const [stats, setStats] = useState({});
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
      <nav>
        <h1>
          Duty<span style={{color : "#2b124c"}}>Sync</span>
        </h1>

        <div className="navright">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <button>logout</button>
        </div>
      </nav>
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
      <TaskData stats={stats} />

      <TaskDiv tasks={task} />
    </div>
  );
};

export default EmplyoeeDashboard;
