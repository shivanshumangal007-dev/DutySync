import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formhandler = (e) => {
    e.preventDefault();
    console.log("form submitted");

    console.log("email : ", email )
    console.log("password : ", password )
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
              type="email"
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
