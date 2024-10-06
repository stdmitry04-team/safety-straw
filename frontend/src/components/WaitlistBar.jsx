import "../styles/WaitlistBar.css"

export default function WaitlistBar(props) {
    return (
        <div className="waitlist">
            <h2 className="waitlist-header">Stay up to date on Safety Straw news!</h2>
            <div className="waitlist-right">
                <form className="waitlist-form">
                    <input className="waitlist-input waitlist-firstname" placeholder="First Name" type="text" />
                    <div className="waitlist-email-wrapper">
                        <input className="waitlist-input waitlist-email" placeholder="Email Address" type="text" />
                        <button className="waitlist-button">Yes Please!</button>
                    </div>
                </form>
                <p className="waitlist-terms">
                    By submitting you agree to receive email marketing from Safety Straw, 
                    as well as to the <span className="term-link"> Terms & Conditions </span>
                    & <span className="term-link"> Privacy Policy</span>.
                </p>
            </div>
        </div>
    )
}