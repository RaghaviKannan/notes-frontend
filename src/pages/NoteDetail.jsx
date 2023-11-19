import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import "../styles/notedetail.scss";
import { url } from "../config";

const NoteDetail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        const response = await axios.get(`${url}/notes/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setNote(response.data);
      }
    } catch (error) {
      console.error("Error fetching note details:", error);
    }
  };

  const handleInputChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const updateNote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        await axios.put(`${url}/notes/${id}`, note, {
          headers: {
            Authorization: token,
          },
        });
      }
      alert("Notes updated");
      navigate("/notes");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        await axios.delete(`${url}/notes/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        alert("Note deleted");
        navigate("/notes");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="note-detail-container">
          <h2>{note.title}</h2>
          <p>Category: {note.category}</p>
          <textarea
            name="content"
            value={note.content}
            onChange={handleInputChange}
          ></textarea>
          <button type="button" className="update-button" onClick={updateNote}>
            Update Note
          </button>
          <button type="button" className="delete-button" onClick={deleteNote}>
            Delete Note
          </button>
          <Link to="/notes">Go Back to Notes</Link>
        </div>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};

export default NoteDetail;
