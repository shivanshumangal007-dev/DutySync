import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const formhandler = async (e) => {
    e.preventDefault();
    console.log("form submitted");

    console.log("email : ", email);
    console.log("password : ", password);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Login Success:", response.data);
      // setUsername(response.data.userDetails.username);
      // setTasks(response.data.tasks || []);

      const responseIsAdmin = response.data.user.is_admin;
      // console.log("Is Admin:", responseIsAdmin);
      if(responseIsAdmin){
        navigate("/admin/dashboard");
        return;
      }
      navigate("/employee/dashboard");
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };
  return (
    <div className="loginMainDiv">
      <div className="loginDiv">
        <h1>login</h1>
        <div className="inputs">
          <form
            action=""
            onSubmit={(e) => {
              formhandler(e);
            }}
          >
            <h2>email:</h2>
            <input
              type="text"
              placeholder="enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <h2>password:</h2>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="enter your password"
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
