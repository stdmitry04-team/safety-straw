// import "../styles/footer.css"
import "../styles/footer.css";

import footer_logo from "../assets/footer-logo.svg";
import inst from "../assets/inst.svg";
import linkedin from "../assets/linkedin.svg";
import tiktok from "../assets/tiktok.svg";
import { useLocation } from 'react-router-dom';

export default function Footer(){

    const footerStyle = {
        backgroundColor: location.pathname === '/checkout' ? '#E3E3E3' : '#fff',
    };

    return(
        <footer class="footer" id="footer" style={footerStyle}>


            <div className="footer-left">
                <div className="footer-logo">
                    <img className="footer-logo-img" src={footer_logo} alt="logo" />
                </div>
                <p className = "footer-text">Safety Straw is a company <br />focused on establishing a <br/> safer nightlife environment.</p>
                <div className="icons">
                <a href="https://www.instagram.com/safetystrawcorporation?igsh=eHVucjVkc2N4eGUw" target="_blank" rel="noopener noreferrer">
                    <img className="footer-social" src={inst} alt="Instagram" />
                </a>

                <a href="https://www.linkedin.com/company/safety-straw/" target="_blank" rel="noopener noreferrer">
                    <img className="footer-social" src={linkedin} alt="LinkedIn" />
                </a>

                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                    <img className="footer-social" src={tiktok} alt="TikTok" />
                </a>
                </div>

                
            </div>


            <div className="footer-links">
                {/* <ul className="footer-links-ul customers">
                    <li>Customers</li>
                    <li>Login</li>
                    <li>Order History</li>
                    <li>Billing</li>
                    <li>Support</li>
                </ul> */}

                <ul className="footer-links-ul contact_us">
                    <li>Contact Us</li>
                    <li><a href="tel:+17345608025">1 (734)-560-8025</a></li>
                    <li><a href="mailto:SafetyStraws@gmail.com">Safetystraw2024@gmail.com</a></li>
                    <li><a href="https://www.google.com/maps/search/?api=1&query=1140+Abbot+Rd+Unit+1601+East+Lansing+MI+48823" target="_blank">
                        1140 Abbot Rd Unit 1601 East Lansing, MI 48823
    </a></li>
                </ul>

                {/* <ul className="footer-links-ul company">
                    <li>Company</li>
                    <li>About Us</li>
                    <li>FAQs</li>
                    <li>Store Locator</li>
                </ul> */}
            </div>
        </footer>
    )
}