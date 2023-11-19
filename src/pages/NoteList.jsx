import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import "../styles/noteList.scss";
import { url } from "../config";

const NoteList = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  const categories = ["Personal", "Work", "Study", "Other"];

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [searchInput, notes]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        const response = await axios.get(`${url}/notes`, {
          headers: {
            Authorization: token,
          },
        });
        setNotes(response.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        await axios.delete(`${url}/notes/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        fetchNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const createNote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        await axios.post(`${url}/notes`, newNote, {
          headers: {
            Authorization: token,
          },
        });
        fetchNotes();
        setNewNote({
          title: "",
          content: "",
          category: "",
        });
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const filterNotes = () => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        note.content.toLowerCase().includes(searchInput.toLowerCase()) ||
        note.category.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  return user ? (
    <div className="note-list-container">
      <div className="greeting">
        {user && <p style={{ fontSize: "32px" }}>Hi, {user.name}!!</p>}
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <label>Search: </label>
          <input
            type="text"
            placeholder="type a keyword/category"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="notes-section-container">
        <div className="notes-list">
          <h2>Your notes:</h2>
          {notes.length !== 0 ? (
            <ul>
              {filteredNotes.map((note) => (
                <li key={note._id}>
                  <h3>{note.title}</h3>

                  <Link to={`/notes/${note._id}`}>View Details</Link>
                  <button onClick={() => deleteNote(note._id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Looks empty ☹️ Start creating a note.</p>
          )}
        </div>
        <div className="create-note">
          <h3>Create a New Note</h3>
          <form>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newNote.title}
              onChange={handleInputChange}
            />
            <label>Content:</label>
            <textarea
              name="content"
              value={newNote.content}
              onChange={handleInputChange}
            ></textarea>
            <label>Category:</label>
            <select
              name="category"
              value={newNote.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="button" onClick={createNote}>
              Create Note
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <>
      <p>
        Oops! ☹️ You are not logged in. Login or Create an account now to start
        writing notes.
      </p>
      <Link to="/">Go to Home Page</Link>
    </>
  );
};

export default NoteList;
