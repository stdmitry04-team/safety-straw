import { useState } from "react";
import dotenv from "dotenv";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //figure out env later

  const API_PORT = process.env.API_PORT || 5000;
  const REG_PORT = process.env.REG_PORT || 3000;
  const baseUrl = process.env.BASE_URL || `http://localhost:${API_PORT}`;
  const REG_URL = process.env.REG_URL || `http://localhost:${REG_PORT}`;
  const handleSubmit = async (e) => {
    if (username && password) {
      const response = await fetch(`${baseUrl}/api/verify-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: username, pwd: password }),
      });

      const { token } = await response.json();
      if (response.ok && token != "ERROR") {
        localStorage.setItem("token", token);
        window.location = `${REG_URL}/admin`;
      } else {
        window.location = `baseUrl`;
        console.error(data.message);
      }
    }
  };

  return (
    <>
      <form id="login-form">
        <input
          placeholder="username"
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          placeholder="password"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </form>
      <button
        id="login-submit"
        type="submit"
        onClick={async () => {
          handleSubmit();
        }}
      >
        Submit
      </button>
    </>
  );
}

export default Login;
