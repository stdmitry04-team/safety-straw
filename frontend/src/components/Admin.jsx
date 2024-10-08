import "../styles/Admin.css";
import React, { useState } from "react";
export function Admin() {
  const [subject, setSubject] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    if (subject && header && content) {
      //e.preventDefault();

      console.log(subject);
      const response = await fetch("http://localhost:5000/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, header, content }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setContent("");
        setHeader("");
        setSubject("");
      } else {
        console.error(data.message); // Error message from the server
      }
    }
  };

  return (
    <>
      <div className="dash-container">
        <div className="dash-settings-container">
          <form id="update-content-form" onSubmit={handleSubmit}>
            <p className="admin-labels">Subject:</p>
            <input
              type="text"
              id="subject"
              className="form-properties"
              onChange={(e) => setSubject(e.target.value)}
            ></input>
            <p className="admin-labels">Header:</p>
            <input
              type="text"
              id="header"
              className="form-properties"
              onChange={(e) => setHeader(e.target.value)}
            ></input>
            <p className="admin-labels">Content:</p>
            <textarea
              type="text"
              id="content"
              className="form-properties"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button id="submit-newsletter" type="submit">
              Update newsletter!
            </button>
          </form>
        </div>
        <div className="dash-example-container">
          <p>col 2</p>
        </div>
      </div>
    </>
  );
}
