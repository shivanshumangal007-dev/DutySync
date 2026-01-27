import axios from "axios";
import React, { useState } from "react";

const AdminDashboard = () => {
  // ✅ Separate states for each field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [assigned_to, setAssignedTo] = useState("");
  const [due_date, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  // ✅ Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();


    // ✅ Task Object according to schema
    const taskData = {
      title: title,
      description: description,
      status: status,
      assigned_to: assigned_to,
      due_date: due_date,
      priority: priority,
    };

    try {
        const response = axios.post("http://127.0.0.1:8000/admin_/newTask", taskData, {
          withCredentials: true,
        });
        console.log(response.data);
        console.log("Task Created:", taskData);
    } catch (error) {
        console.log(error, "error in creating task");
    }
    alert("✅ Task Created Successfully!");
  };

  return (
    <div className="bg-pink-50 min-h-screen flex justify-center items-center">
      {/* Form Container */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border-2 border-pink-200">
        {/* Title */}
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">
          Create New Task
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ✅ Title */}
          <div>
            <label className="block text-pink-700 font-semibold mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg 
              focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* ✅ Description */}
          <div>
            <label className="block text-pink-700 font-semibold mb-1">
              Task Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows="3"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg 
              focus:ring-2 focus:ring-pink-400 outline-none"
            ></textarea>
          </div>

          {/* ✅ Status */}
          <div>
            <label className="block text-pink-700 font-semibold mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg 
              focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* ✅ Assigned To */}
          <div>
            <label className="block text-pink-700 font-semibold mb-1">
              Assigned To (Employee ID)
            </label>
            <select
              value={assigned_to}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg 
              focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="">Select Employee</option>
              <option value="EMP001">EMP001</option>
              <option value="EMP002">EMP002</option>
              <option value="EMP003">EMP003</option>
              <option value="EMP004">EMP004</option>
            </select>
          </div>

          {/* ✅ Due Date */}
          <div>
            <label className="block text-pink-700 font-semibold mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={due_date}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg 
              focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* ✅ Priority */}
          <div>
            <label className="block text-pink-700 font-semibold mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg 
              focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-bold 
            hover:bg-pink-600 transition duration-300"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};;

export default AdminDashboard;
