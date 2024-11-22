import React, { useState, useEffect, useRef } from "react";
import dotenv from "dotenv";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async () => {
    try {
      console.log(email, password);
      const res = await signInWithEmailAndPassword(email, password);
      console.log({res})
      setEmail('');
      setPassword('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form id="login-form">
        <input
          placeholder="username"
          type="text"
          id="username"
          onChange={(e) => setEmail(e.target.value)}
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
          handleLogin();
        }}
      >
        Submit
      </button>
    </>
  );
}

export default Login;
