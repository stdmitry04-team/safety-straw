import React, { useState, useEffect, useRef } from "react";
import dotenv from "dotenv";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/config";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      console.log(password, confirmPassword)
      if (password === confirmPassword) {
        const res = await createUserWithEmailAndPassword(email, password);
        console.log({res})
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        if (res) {
          updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`
          }).then(() => {
            console.log("Display name updated!");
          }).catch((error) => {
            console.log("Error updating display name:", error);
          })
          setFirstName('');
          setLastName('');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form id="login-form">
        <input
          placeholder="firstname"
          type="text"
          id="firstname"
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <input
          placeholder="lastname"
          type="text"
          id="lastname"
          onChange={(e) => setLastName(e.target.value)}
          ></input>
        <input
          placeholder="email"
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          placeholder="password"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          placeholder="confirm password"
          type="password"
          id="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
