import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    if (username && password) {
      const response = await fetch("http://localhost:5000/api/verify-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: username, pwd: password }),
      });

      const { token } = await response.json();
      if (response.ok && token != "ERROR") {
        localStorage.setItem("token", token);
        window.location = "http://localhost:3000/admin";
      } else {
        window.location = "http://localhost:3000/";
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
