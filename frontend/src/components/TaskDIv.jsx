import React, { use, useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const TaskDiv = ({ tasks }) => {
  // const [task, setTasks] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       // The URL of your Django TaskView
  //       setTasks(tasks);
  //       // console.log("Fetched tasks:", response.data.tasks);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  // if (loading) return <p>Loading tasks...</p>;
  const navigate = useNavigate();
  const completeHandler = async (taskId) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/task/${taskId}/update/`,
        { status: "COMPLETED" }, // Data being sent
        { withCredentials: true }, // Keeps you logged in
      );

      console.log(response.data.message);

      // Refresh the page or update the local state so the UI changes
      window.location.reload();
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };


  return (
    <div className="taskdiv">
      {tasks.map((task, key) => {
        if (task.status !== "COMPLETED") {
          return (
            <div className="taskbox" key={key}>
              <div className="uppermost">
                <span
                  className={`task-flag ${task.priority === "HIGH" ? "red-flag" : task.priority == "MEDIUM" ? "orange-flag" : "red-flag"}`}
                >
                  {task.priority}
                </span>
                <span className="due-date">Due date: {task.due_date}</span>
              </div>
              <h1>{task.title}</h1>
              <p>{task.description}</p>
              <div className="btn">
                <button onClick={() => completeHandler(task.id)}>
                  mark as complete
                </button>
              </div>
            </div>
          );
        }
      })}
      {/* <div className="taskbox">
        <div className="uppermost">
          <span className="task-flag">high</span>
          <span className="due-date">Due date: 2024-05-15</span>
        </div>
        <h1>heading</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum earum aut at, hic fugit numquam!</p>
        <div className="btn">
          <button>mark as complete</button>
        </div>
      </div> */}
      {tasks.map((task, key) => {
        if (task.status === "COMPLETED") {
          return (
            <div className="taskbox completed" key={key}>
              <div className="uppermost">
                <span
                  className={`task-flag ${task.priority === "HIGH" ? "red-flag" : task.priority == "MEDIUM" ? "orange-flag" : "red-flag"}`}
                >
                  {task.priority}
                </span>
                <span className="due-date">Due date: {task.due_date}</span>
              </div>
              <h1>{task.title}</h1>
              <p>{task.description}</p>
              <div className="btn">
                <button
                  style={{ backgroundColor: "green" }}
                  disabled
                  onClick={() => completeHandler(task.id)}
                >
                  completed
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TaskDiv;
