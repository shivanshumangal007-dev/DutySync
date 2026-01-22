import React from 'react'

const EmplyoeeDashboard = () => {
  return (
    <div className="employeeMainDiv">
      <h1>hello, rohit 👋</h1>

      <div className="tasksData">
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
      </div>

      <div className="taskdiv">
        <div className="taskbox">
          <h1>do optimisation of DSA code</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
            maiores modi rerum illum doloribus voluptate accusamus deserunt
            nesciunt voluptatibus minus?
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmplyoeeDashboard
