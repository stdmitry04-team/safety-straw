import "../styles/WaitlistBar.css"
import React, { useState } from 'react';
// require("dotenv").config({ path: "../backend/config.env" });
// const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';


export default function WaitlistBar(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validStatus, setValidStatus] = useState(true);
    const baseUrl = provess.env.BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const response = await fetch(`${backendUrl}/api/waitlist`, {
        const response = await fetch(`${baseUrl}/api/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {name, email} ),
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
        document.getElementById("error-message").textContent = data.message;
    }

    return (
        <div className="waitlist">
            <h2 className="waitlist-header">Stay up to date on Safety Straw news!</h2>
            <div className="waitlist-right">
                <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input className="waitlist-input waitlist-firstname" onChange={(e) => setName(e.target.value)} placeholder="First Name" type="text" />
                    <div className="waitlist-email-wrapper">
                        <input className="waitlist-input waitlist-email" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" type="text" />
                        <button type="submit"className="waitlist-button">Yes Please!</button>
                    </div>
                </form>
                <p id="error-message" className={validStatus ? "waitlist-valid": "waitlist-invalid"}></p>
                <p className="waitlist-terms">
                    By submitting you agree to receive email marketing from Safety Straw, 
                    as well as to the <span className="term-link"> Terms & Conditions </span>
                    & <span className="term-link"> Privacy Policy</span>.
                </p>
            </div>
        </div>
    )
}