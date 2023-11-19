import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { useTheme } from "../themeContext";
import "../styles/navbar.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <div className="left">
        <h1>Note App</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/notes">Notes</Link>
          </li>
        </ul>
      </div>
      {user && (
        <div className="right">
          <button
            onClick={handleToggleTheme}
            style={{ backgroundColor: "#28a745", marginRight: "10px" }}
          >
            Toggle Theme
          </button>
          <p>{user.name}</p>
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="User Avatar"
            className="avatar"
          />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
