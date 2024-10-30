import "../styles/Admin.css";
import React, { useState, useEffect, useRef } from "react";
import companyLogo from "../assets/safety-straw-logo.png";

export function Admin() {
  const [subject, setSubject] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, header, content, token }),
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
      const response = await fetch(
        `${baseUrl}/api/get-newsletter?token=${token}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      data = data[0];
      setSubjectTemplate(data[0]);
      setHeaderTemplate(data[1]);
      setContentTemplate(data[2]);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

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
            <button
              className="dash-buttons"
              id="submit-newsletter"
              type="submit"
            >
              Update newsletter!
            </button>
          </form>
        </div>
        <div className="dash-example-container">
          <p className="example-header">Example email:</p>
          <h1 className="email-header">{headerTemplate}</h1>
          <div className="content-container">
            <img src={companyLogo} className="company-logo" />
            <p>{contentTemplate}</p>
          </div>
          <footer>
            <p>This is the footer</p>
          </footer>
        </div>
      </div>
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
    </>
  );
}
