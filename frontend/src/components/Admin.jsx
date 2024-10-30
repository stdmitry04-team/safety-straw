import "../styles/Admin.css";
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState, useEffect, useRef } from "react";
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
import companyLogo from "../assets/safety-straw-logo.png";

export function Admin() {
  const [subject, setSubject] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
<<<<<<< HEAD
  const [subjectTemplate, setSubjectTemplate] = useState("");
  const [headerTemplate, setHeaderTemplate] = useState("");
  const [contentTemplate, setContentTemplate] = useState("");

  const handleSubmit = async (e) => {
    if (subject && header && content) {
      console.log(subject);
      const response = await fetch("http://localhost:5000/api/update", {
=======
  const [headerTemplate, setHeaderTemplate] = useState("");
  const [contentTemplate, setContentTemplate] = useState("");
  const [subjectTemplate, setSubjectTemplate] = useState("");
  const calendar = useRef(null);
  const token = localStorage.getItem("token");
  const PORT = process.env.API_PORT || 5000; // Make sure PORT is defined here

  const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

  const handleSubmit = async (e) => {
    if (subject && header && content) {
      const response = await fetch(`${baseUrl}/api/update`, {
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
<<<<<<< HEAD
        body: JSON.stringify({ subject, header, content }),
=======
        body: JSON.stringify({ subject, header, content, token }),
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
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
<<<<<<< HEAD
      const response = await fetch("http://localhost:5000/api/get-newsletter", {
        method: "GET",
      });
=======
      const response = await fetch(
        `${baseUrl}/api/get-newsletter?token=${token}`,
        {
          method: "GET",
        }
      );
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

<<<<<<< HEAD
      const data = await response.json();
=======
      let data = await response.json();
      data = data[0];
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
      setSubjectTemplate(data[0]);
      setHeaderTemplate(data[1]);
      setContentTemplate(data[2]);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    getData();
=======
  const confirmRole = async () => {
    const response = await fetch(`${baseUrl}/api/get-role?token=${token}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    if (data.result != "Admin") {
      //window.location = "http://localhost:3000/";
      console.error("Incorrect credentials");
    }
  };

  useEffect(() => {
    confirmRole();
    getData();
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("calendar").setAttribute("min", today);
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
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
<<<<<<< HEAD
            <button id="submit-newsletter" type="submit">
=======
            <button
              className="dash-buttons"
              id="submit-newsletter"
              type="submit"
            >
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
              Update newsletter!
            </button>
          </form>
        </div>
        <div className="dash-example-container">
<<<<<<< HEAD
          <p class="example-header">Example email:</p>
          <h1 class="email-header">{headerTemplate}</h1>
          <div class="content-container">
            <img src={companyLogo} class="company-logo" />
=======
          <p className="example-header">Example email:</p>
          <h1 className="email-header">{headerTemplate}</h1>
          <div className="content-container">
            <img src={companyLogo} className="company-logo" />
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
            <p>{contentTemplate}</p>
          </div>
          <footer>
            <p>This is the footer</p>
          </footer>
        </div>
      </div>
<<<<<<< HEAD
=======
      <div className="settings-container">
        <h1>Schedule your email</h1>
        <input type="date" id="calendar" name="scheduled-time" ref={calendar} />
        <button
          className="dash-buttons"
          id="schedule-button"
          onClick={async () => {
            if (calendar.current.value) {
              let scheduleTime = calendar.current.value + "T12:00:00";
              await fetch(`${baseUrl}/api/schedule-mail`, {
                method: "POST",
                body: JSON.stringify({ date: scheduleTime, token: token }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }
          }}
        >
          Schedule Email!
        </button>
        <button
          className="dash-buttons"
          id="send-mail"
          onClick={async () => {
            await fetch(`${baseUrl}/api/send-mail`, {
              method: "POST",
              body: JSON.stringify({ token: token }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          }}
        >
          Send Now!
        </button>
      </div>
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
    </>
  );
}
