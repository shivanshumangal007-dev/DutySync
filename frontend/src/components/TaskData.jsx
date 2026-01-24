import axios from "axios";

const TaskData = ({ stats = {} }) => {
  const completed = stats.completed || 0;
  const pending = stats.pending || 0;
  const inProgress = stats.inProgress || 0;

  const percentage =
    completed + pending > 0
      ? Math.round((completed / (completed + pending + inProgress)) * 100)
      : 0;

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
