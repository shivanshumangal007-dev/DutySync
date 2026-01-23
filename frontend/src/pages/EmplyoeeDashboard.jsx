import React from 'react'
import TaskDiv from '../components/TaskDIv';
import TaskData from '../components/TaskData';

const EmplyoeeDashboard = () => {
  return (
    <div className="employeeMainDiv">
      <h1>hello, rohit 👋</h1>

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
      </div> */}
      <TaskData/>


      <TaskDiv/>
    </div>
  );
}

export default EmplyoeeDashboard
