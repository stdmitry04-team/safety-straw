import React, { useState, useEffect, useRef } from "react";
import dotenv from "dotenv";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/config";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
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
          handleSignUp();
        }}
      >
        Submit
      </button>
    </>
  );
}

export default SignUp;
