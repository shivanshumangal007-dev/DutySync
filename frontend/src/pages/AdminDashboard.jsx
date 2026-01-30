import axios from "axios";
import React, { useState } from "react";
import "./AdminDashboard.css";
import {Navigate, useNavigate} from 'react-router-dom';
import { myBaseUrl } from "../config/api";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [assigned_to, setAssignedTo] = useState("");
  const [due_date, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      status,
      assigned_to,
      due_date,
      priority,
    };

    try {
      const response = await axios.post(
        `${myBaseUrl}/admin_/newTask`,
        taskData,
        { withCredentials: true },
      );
      console.log(response);
      navigate('/admin/dashboard');
      alert("✅ Task Created Successfully!");
    } catch (error) {
      console.log(error, "error in creating task");
      alert("❌ Failed to create task");
    }
  };

  return (
    <div className="page">
      <div className="form-container">
        <h2 className="form-title">Create New Task</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div className="form-group">
            <label>Task Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          {/* <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div> */}

          <div className="form-group">
            <label>Assigned To (Employee ID)</label>
            <select
              value={assigned_to}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select Employee</option>
              <option value="shivanshu">shivanshu</option>
              <option value="EMP002">EMP002</option>
              <option value="EMP003">EMP003</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={due_date}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
