import "../styles/footer.css"
import footer_logo from "../assets/footer-logo.svg"
import inst from "../assets/inst.svg"
import linkedin from "../assets/linkedin.svg"
import tiktok from "../assets/tiktok.svg"

export default function Footer(){
    return(
        <footer class="footer" id="footer">


            <div className="footer-left">
                <div className="footer-logo">
                    <img src={footer_logo} alt="logo" />
                </div>
                <p class = "footer-text">Safety Straw is a company <br />focused on establishing a <br/> safer nightlife environment.</p>
                <div class="icons">
                    <img src={inst} alt="" />
                    <img src={linkedin} alt="" />
                    <img src={tiktok} alt="" />
                </div>

                
            </div>


            <div class="footer-links">
                <ul class="customers">
                    <li>Customers</li>
                    <li>Login</li>
                    <li>Order History</li>
                    <li>Billing</li>
                    <li>Support</li>
                </ul>

                <ul class="contact_us">
                    <li>Contact Us</li>
                    <li>1 (555)-5555</li>
                    <li>SafetyStraws@gmail.com</li>
                    <li>222 CompanyAd St, MI</li>
                </ul>

                <ul class="company">
                    <li>Company</li>
                    <li>About Us</li>
                    <li>FAQs</li>
                    <li>Store Locator</li>
                </ul>
            </div>
        </footer>
    )
}