import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Note(props) {

  
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          props.handleDelete();
        }}
      >
        <DeleteIcon />
      </button>
      <button
        onClick={() => {
          props.handleEdit();
        }}
      >
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
