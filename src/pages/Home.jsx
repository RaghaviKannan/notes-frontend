import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import "../styles/home.scss";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="home-left">
        <h2>Welcome to the Note App!</h2>
        <p>
          Create, edit, and organize your digital notes with ease. Enhance your
          productivity by using our user-friendly interface.
        </p>
        <p>
          <strong>Features:</strong>
          <ul>
            <li>Create, edit, delete, and view notes with text.</li>
            <li>Search functionality for quick note retrieval.</li>
            <li>User authentication and accounts for data synchronization.</li>
            <li>Security measures including encrypted storage.</li>
            <li>Customizable appearance and settings.</li>
            <li>Responsive design for accessibility on various devices.</li>
          </ul>
        </p>
      </div>
      <div className="home-right">
        {user ? (
          <>
            <p>You are logged in. Go to your notes.</p>
            <Link to="/notes">Go to Notes</Link>
          </>
        ) : (
          <>
            <p>Register yourself to start taking notes!</p>
            <Link to="/register">
              <button>Register</button>
            </Link>
            <p>Already have an account?</p>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
