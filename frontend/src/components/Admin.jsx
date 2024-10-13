import "../styles/Admin.css";
import React, { useState, useEffect, useRef } from "react";
import companyLogo from "../assets/safety-straw-logo.png";

export function Admin() {
  const [subject, setSubject] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [subjectTemplate, setSubjectTemplate] = useState("");
  const [headerTemplate, setHeaderTemplate] = useState("");
  const [contentTemplate, setContentTemplate] = useState("");
  const calendar = useRef(null);

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

  /**
   * Main driver function to send emails
   */
  const sendNewsLetter = async () => {
    let response = await fetch("http://localhost:5000/api/get-recipients", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let recipients = await response.json();
    console.log(recipients);

    response = await fetch("http://localhost:5000/api/get-newsletter", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let newsletter_content = await response.json();

    const info = await transporter.sendMail({
      from: `${process.env.MAILING_EMAIL}`,
      to: recipients,
      subject: newsletter_content[0][0],
      html: newsletter_content[1],
      attachments: [newsletter_content[2]],
    });

    client.close();
  };

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/get-newsletter", {
        method: "GET",
      });

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

  useEffect(() => {
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
        <button className="dash-buttons" id="schedule-button">
          Schedule Email!
        </button>
        <button
          className="dash-buttons"
          id="send-mail"
          onClick={async () => {
            await sendNewsLetter();
          }}
        >
          Send Now!
        </button>
      </div>
    </>
  );
}
