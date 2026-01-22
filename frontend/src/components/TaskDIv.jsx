import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskDiv = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // The URL of your Django TaskView
        const response = await axios.get("http://127.0.0.1:8000/task/", {
          withCredentials: true,
        });
        setTasks(response.data);
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
    <div className="taskdiv">
      {tasks.map((task) => (
        <div className="taskbox">
          <h1>{task.title}</h1>
          <p>
            {task.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TaskDiv;
