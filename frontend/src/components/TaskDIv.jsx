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
      {/* {tasks.map((task) => (
        <div className="taskbox">
          <h1>{task.title}</h1>
          <p>
            {task.description}
          </p>
        </div>
      ))} */}
      <div className="taskbox">
        <div className="uppermost">
          <span className="task-flag">high</span>
          <span className="due-date">Due date: 2024-05-15</span>
        </div>
        <h1>heading</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum earum aut at, hic fugit numquam!</p>
        <div className="btn">
          <button>mark as complete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskDiv;
