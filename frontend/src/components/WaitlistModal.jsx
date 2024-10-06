import "../styles/WaitlistModal.css";
import React, { useState } from 'react';

export default function WaitlistModal(props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const onClose = () => {
        setModalOpen(true);
    }
    
    return (
        <div className={isModalOpen ? "modal-overlay modal-visibility" : "modal-overlay"}>
        <div className="waitlist-modal">
            <h1 className="modal-header">Stay up to date on Safety Straw news!</h1>
            <p className="modal-header2">
                Sign up for our 
                <span className="highlighted-text"> newsletter </span>
                to receive updates on Safety Straw!
            </p>
            <form className="modal-form">
                <input className="modal-input" type="text" placeholder="First Name" />
                <input className="modal-input" type="text" placeholder="Email Address"/>
                <button className="modal-button">Yes Please!</button>
            </form>
            <p className="modal-terms">
            By submitting you agree to receive email marketing from Safety Straw, 
            as well as to the 
            <span className="highlighted-text"> Terms & Conditions </span>
             & <span className="highlighted-text"> Privacy Policy</span>.
            </p>
            <button className="modal-close" onClick={onClose}>
                <img src="\images\close-button.png" width="16" height="16" />
            </button>
        </div>
        </div>
    )
}