import React from "react";

const Login = () => {
  return (
    <div className="loginMainDiv">
      <div className="loginDiv">
        <h1>login</h1>
        <div className="inputs">
          <h2>email:</h2>
          <input type="email" placeholder="enter your email" />
          <h2>password:</h2>
          <input type="password" placeholder="enter your password" />

          <input type="submit" />
        </div>
      </div>
    </div>
  );
};

export default Login;
