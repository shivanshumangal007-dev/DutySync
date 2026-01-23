import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="taskdiv">
      {tasks.map((task, key) => (
        <div className="taskbox" key={key}>
          <div className="uppermost">
            <span className="task-flag">{task.priority}</span>
            <span className="due-date">Due date: {task.due_date}</span>
          </div>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div className="btn">
            <button>mark as complete</button>
          </div>
        </div>
      ))}
      {/* <TaskDiv/> */}
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
    </div>
  );
};

export default TaskDiv;
