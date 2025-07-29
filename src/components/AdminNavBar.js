import React from "react";

function AdminNavBar({ onChangePage }) {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      padding: "1rem",
      backgroundColor: "#f0f0f0",
      marginBottom: "2rem"
    }}>
      <button 
        onClick={() => onChangePage("Form")}
        style={{
          padding: "0.5rem 1rem",
          cursor: "pointer"
        }}
      >
        New Question
      </button>
      <button 
        onClick={() => onChangePage("List")}
        style={{
          padding: "0.5rem 1rem",
          cursor: "pointer"
        }}
      >
        View Questions
      </button>
    </nav>
  );
}

export default AdminNavBar;