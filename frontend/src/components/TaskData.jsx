import axios from "axios";
import React, { useDebugValue, useEffect, useState } from "react";

const TaskData = () => {
  //   const [tasks, setTasks] = useState([]);
  const [completed, setcompleted] = useState(0);
  const [pending, setpending] = useState(0);
  const [progress, setprogress] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // The URL of your Django TaskView
        const response = await axios.get("http://127.0.0.1:8000/task/", {
          withCredentials: true,
        });
        // setTasks(response.data.tasks);
        setcompleted(response.data.stats.completed);
        setpending(response.data.stats.pending);
        setprogress(response.data.stats.inProgress);
        // console.log("Fetched tasks:", response.data.tasks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  return (
    <div className="tasksData">
      <div className="taskInfo">
        <h1>{completed}</h1>
        <h2>completed</h2>
      </div>
      <div className="taskInfo">
        <h1>{pending}</h1>
        <h2>pending</h2>
      </div>
      <div className="taskInfo">
        <h1>{progress}</h1>
        <h2>in Progress</h2>
      </div>
      <div className="taskInfo">
        <h1>{completed / (pending + completed) * 100 || 0}%</h1>
        <h2>progress</h2>
      </div>
    </div>
  );
};

export default TaskData;
