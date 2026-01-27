import React, { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import gsap from "gsap";
const TaskDiv = ({ tasks, setTasks, setStats }) => {
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

  const taskdivref = useRef();
  const completeHandlerpending = async (taskId) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/task/${taskId}/update/`,
        { status: "COMPLETED" }, // Data being sent
        { withCredentials: true }, // Keeps you logged in
      );

      console.log(response.data.message);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "COMPLETED" } : task,
        ),
      );
      setStats((prevStats) => {
        const newCompleted = (prevStats.completed || 0) + 1;
        const newPending = (prevStats.pending || 0) - 1;
        return {
          ...prevStats,
          completed: newCompleted,
          pending: newPending >= 0 ? newPending : 0,
        };
      });
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };
  const completeHandlerinprogress = async (taskId) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/task/${taskId}/update/`,
        { status: "COMPLETED" }, // Data being sent
        { withCredentials: true }, // Keeps you logged in
      );

      console.log(response.data.message);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "COMPLETED" } : task,
        ),
      );
      setStats((prevStats) => {
        const newCompleted = (prevStats.completed || 0) + 1;
        const newinprogress = (prevStats.inprogress || 0) - 1;
        return {
          ...prevStats,
          completed: newCompleted,
          inProgress: newinprogress >= 0 ? newinprogress : 0,
        };
      });
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };
  const inprogressHandler = async (taskId) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/task/${taskId}/update/`,
        { status: "IN_PROGRESS" }, // Data being sent
        { withCredentials: true }, // Keeps you logged in
      );

      console.log(response.data.message);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "IN_PROGRESS" } : task,
        ),
      );
      setStats((prevStats) => {
        const newinProgress = (prevStats.inProgress || 0) + 1;
        const newPending = (prevStats.pending || 0) - 1;
        return {
          ...prevStats,
          inProgress: newinProgress,
          pending: newPending >= 0 ? newPending : 0,
        };
      });
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };
  useEffect(() => {
    const preloader = () => {
      const ctx = gsap.context(() => {
        gsap.from(taskdivref.current.children, {
          duration: 1,
          x: "-100%",
          opacity: 0,
          ease: "power2.out",
          stagger: 0.2,
          delay: 0.5,
        });
        // console.log(taskdivref.current);
      });
      return () => {
        ctx.revert();
      };
    };
    return preloader();
  }, []);

  return (
    <div ref={taskdivref}>
      <div className="taskdiv" >
        {tasks.map((task, key) => {
          if (task.status !== "COMPLETED" && task.status !== "PENDING") {
            return (
              <div className="taskbox inprogress" key={key}>
                <div className="uppermost">
                  <span
                    className={`task-flag ${task.priority === "HIGH" ? "red-flag" : task.priority == "MEDIUM" ? "orange-flag" : "green-flag"}`}
                  >
                    {task.priority}
                  </span>
                  <span className="inprogreessToaster">in progress!</span>
                  <span className="due-date">Due date: {task.due_date}</span>
                </div>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <div className="btn">
                  <button onClick={() => completeHandlerinprogress(task.id)}>
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
      </div>
      <div className="taskdiv" >
        {tasks.map((task, key) => {
          if (task.status !== "COMPLETED" && task.status !== "IN_PROGRESS") {
            return (
              <div className="taskbox pending" key={key}>
                <div className="uppermost">
                  <span
                    className={`task-flag ${task.priority === "HIGH" ? "red-flag" : task.priority == "MEDIUM" ? "orange-flag" : "green-flag"}`}
                  >
                    {task.priority}
                  </span>
                  {/* <span>in Progress</span> */}
                  <span className="due-date">Due date: {task.due_date}</span>
                </div>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <div className="btn">
                  <button onClick={() => completeHandlerpending(task.id)}>
                    mark as complete
                  </button>
                  <button onClick={() => inprogressHandler(task.id)}>
                    mark as in Progress
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="taskdiv" >
        {tasks.map((task, key) => {
          if (task.status !== "PENDING" && task.status !== "IN_PROGRESS" ) {
            return (
              <div className="taskbox completed" key={key}>
                <div className="uppermost">
                  <span
                    className={`task-flag ${task.priority === "HIGH" ? "red-flag" : task.priority == "MEDIUM" ? "orange-flag" : "green-flag"}`}
                  >
                    {task.priority}
                  </span>
                  <span className="completedToaster">completed!</span>

                  <span className="due-date">Due date: {task.due_date}</span>
                </div>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <div className="btn">
                  <button
                    style={{ backgroundColor: "green", cursor: "not-allowed" }}
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
    </div>
  );
};

export default TaskDiv;
