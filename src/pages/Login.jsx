import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authContext";
import "../styles/login.scss";
import { url } from "../config";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(url);
      const response = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      login(user);
      navigate("/notes");
    } catch (error) {
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
