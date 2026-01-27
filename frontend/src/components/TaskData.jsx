import axios from "axios";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const TaskData = ({ stats = {} }) => {
  const taskDataRef = useRef();

  useEffect(() => {
    const preloader = () => {
      const ctx = gsap.context(() => {
        gsap.from(taskDataRef.current.children, {
          duration: 1,
          x: "-100%",
          opacity: 0,
          ease: "power2.out",
          stagger: 0.2,
          delay: 0.5,
        });
        // console.log(taskDataRef.current);
      });
      return () => {
        ctx.revert();
      };
    };
    return preloader();
  }, []);

  const completed = stats.completed || 0;
  const pending = stats.pending || 0;
  const inProgress = stats.inProgress || 0;

  const percentage =
    completed + pending > 0
      ? Math.round((completed / (completed + pending + inProgress)) * 100)
      : 0;

  return (
    <div className="tasksData" ref={taskDataRef}>
      <div className="taskInfo">
        <h1>{completed}</h1>
        <h2>completed</h2>
      </div>

      <div className="taskInfo">
        <h1>{pending}</h1>
        <h2>pending</h2>
      </div>

      <div className="taskInfo">
        <h1>{inProgress}</h1>
        <h2>in Progress</h2>
      </div>

      <div className="taskInfo">
        <h1>{percentage}%</h1>
        <h2>progress</h2>
      </div>
    </div>
  );
};

export default TaskData;
