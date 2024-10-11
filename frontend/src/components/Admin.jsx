import "../styles/Admin.css";
import React, { useState, useEffect } from "react";
import companyLogo from "../assets/safety-straw-logo.png";

export function Admin() {
  const [subject, setSubject] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [subjectTemplate, setSubjectTemplate] = useState("");
  const [headerTemplate, setHeaderTemplate] = useState("");
  const [contentTemplate, setContentTemplate] = useState("");

  const handleSubmit = async (e) => {
    if (subject && header && content) {
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

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/get-newsletter", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSubjectTemplate(data[0]);
      setHeaderTemplate(data[1]);
      setContentTemplate(data[2]);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  });

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
          <p class="example-header">Example email:</p>
          <h1 class="email-header">{headerTemplate}</h1>
          <div class="content-container">
            <img src={companyLogo} class="company-logo" />
            <p>{contentTemplate}</p>
          </div>
          <footer>
            <p>This is the footer</p>
          </footer>
        </div>
      </div>
    </>
  );
}
