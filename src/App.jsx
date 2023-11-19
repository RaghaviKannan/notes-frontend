import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteList from "./pages/NoteList";
import NoteDetail from "./pages/NoteDetail";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./authContext";
import { ThemeProvider } from "./themeContext";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notes" element={<NoteList />} />
              <Route path="/notes/:id" element={<NoteDetail />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
