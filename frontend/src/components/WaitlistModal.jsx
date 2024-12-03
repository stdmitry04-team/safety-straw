import "../styles/WaitlistModal.css";
import React, { useState, useEffect } from 'react';
import cross from "../assets/close-button.svg";
// require("dotenv").config({ path: "../.env" });
// const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';


export default function WaitlistModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validStatus, setValidStatus] = useState(true);
    // useEffect(() => {
    //     console.log('Base URL:', process.env.REACT_APP_BASE_URL);
    //     console.log('Base URL Vite:', import.meta.env.VITE_BASE_URL);
    // }, []);

    // // Use the environment variable with a production fallback
    // const baseUrl = process.env.NODE_ENV === 'production' 
    //     ? 'https://safety-straw.fly.dev'  // Hardcode production URL as fallback
    //     : 'http://localhost:5000';        // Development URL

    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

    const errorMessageStyle = {
        color: validStatus ? 'green' : 'red',
        fontSize: '20px',
        marginTop: '-30px',
        textAlign: 'center'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const response = await fetch(`${backendUrl}/api/waitlist`, {
        const response = await fetch(`${baseUrl}api/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        const data = await response.json();

        if (response.ok) {
            setName('');
            setEmail('');
            setValidStatus(true);
        } else {
            console.error(data.message);
            setValidStatus(false);
        }
        document.getElementById("modal-error-message").textContent = data.message;
    };

    return (
        <div className="modal-overlay">
            <div className="waitlist-modal">
                <h1 className="modal-header">Stay up to date on Safety Straw news!</h1>
                <p className="modal-header2">
                    Sign up for our 
                    <span className="highlighted-text"> newsletter </span>
                    to receive updates on Safety Straw!
                </p>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <input 
                        id="modal-username" 
                        className="modal-input" 
                        type="text" 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="First Name" 
                    />
                    <input 
                        id="modal-email" 
                        className="modal-input" 
                        type="text" 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email Address"
                    />
                    <p id="modal-error-message" className={validStatus ? "modal-valid" : "modal-invalid"} style={errorMessageStyle}></p>
                    <button className="modal-button" type="submit">Yes Please!</button>
                </form>
                <p className="modal-terms">
                    By submitting you agree to receive email marketing from Safety Straw, 
                    as well as to the 
                    <span className="highlighted-text"> Terms & Conditions </span>
                    & <span className="highlighted-text"> Privacy Policy</span>.
                </p>
                <button className="modal-close" onClick={onClose}>
                    <img src={cross} width="16" height="16" />
                </button>
            </div>
        </div>
    );
}
