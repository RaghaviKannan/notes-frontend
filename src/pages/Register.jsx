import React, { useState } from "react";
import "../styles/register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${url}/auth/register`, {
        name,
        email,
        password,
      });
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert("Registration failed", error);
      console.log(error);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <div className="register-container">
        <form>
          <label>UserName:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
