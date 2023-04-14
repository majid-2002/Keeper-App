import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Grid from '@mui/material/Grid';
import axios from "axios";
import Note from "./Note/Note";
import fetchNotes from "./Note/fetchNote";

function CreateArea() {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });
  const [notes, setNotes] = useState([]);
  const [idEdit, setidEdit] = useState(null);

  //? Submit Form Input to server
  async function submitForm() {
    if (idEdit == null) {
      try {
        const response = await axios.post("http://localhost:3001/notes", {
          title: input.title,
          content: input.content,
        });
        console.log(response.data);
        const notes = await fetchNotes();
        setNotes(notes)
      } catch (error) {
        console.error(error);
      }
      setInput({
        title: "",
        content: "",
      });
    } else {
      try {
        const response = await axios.put(
          "http://localhost:3001/notes/" + idEdit,
          {
            title: input.title,
            content: input.content,
          }
        );
        console.log(response.data);
        const notes = await fetchNotes();
        setNotes(notes)
      } catch (error) {
        console.error(error);
      }
      setInput({
        title: "",
        content: "",
      });
      setidEdit(null);
    }
  }

  //?Handle the note Delete function
  async function handleDelete(id) {
    try {
      const response = await axios.delete("http://localhost:3001/notes/" + id);
      console.log(response.data);
      const notes = await fetchNotes();
      setNotes(notes)
    } catch (error) {
      console.error(error);
    }
  }

  //? Handle Edit
  function handleEdit(id, notetitle, noteContent) {
    setInput({
      title: notetitle,
      content: noteContent,
    });
    setidEdit(id);
  }

  //? Fetch the notes from the server using Get Method, Here UseEffect works only when the notes array is changed
  useEffect(() => {
    const fetchData = async () => {
      const notes = await fetchNotes();
      setNotes(notes)
    };
    fetchData();
  }, []);

  //? Handle the change in the input field
  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }


  const [isExapanded, setExpand] = useState(false);

  function expand() {
    setExpand(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExapanded ? (
          <input
            name="title"
            onChange={handleChange}
            value={input.title}
            placeholder="Title"
          />
        ) : null}

        <textarea
          name="content"
          onChange={handleChange}
          value={input.content}
          placeholder="Take a note..."
          rows={isExapanded ? 3 : 1}
          onClick={expand}
        />

        {/*Add Button */}

        {input.title.length > 0 && input.content.length > 0 ? (
          <Zoom in={isExapanded}>
            <Fab onClick={submitForm}>
              <AddIcon />
            </Fab>
          </Zoom>
        ) : null}
      </form>

      {notes.map((noteItem, index) => {
        return (

          <Grid xs={12} item key={noteItem._id}>
            <Note
              key={noteItem._id}
              id={noteItem._id} //pass id from the server
              title={noteItem.title}
              content={noteItem.content}
              handleDelete={() => handleDelete(noteItem._id)}
              handleEdit={() =>
                handleEdit(noteItem._id, noteItem.title, noteItem.content)
              }
            />
          </Grid>
        );
      })}
    </div>
  );
}

export default CreateArea;
