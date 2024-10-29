import "../styles/AboutUs.css";
export default function AboutUs() {

    
  const scrollToBottom = () => {
    
    const footerElement = document.getElementById('footer'); // Get the footer by ID
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the footer smoothly
    }
  };
    return (
        <div className="about-us">
            <div className="container">
                <div className="about-us-top">
                    <div className="header">
                        <h1>
                            ABOUT US
                        </h1>
                    </div>
                </div>
                <div className="about-us-bottom">
                    <div className="about-us-left">
                        <iframe src="https://www.youtube.com/embed/hC4Tc3nyhLg"></iframe>
                    </div>
                    <div className="about-us-right">
                        <div className="text">
                            <p>
                                We're Jack & Zak, childhood friends and co-founders of Safety Straw.
                            </p>
                            <p>
                                The company was born to create a safer environment for all and make a real difference. Want to find out more about our story?
                            </p>
                        </div>
                        <div className="contact">
                            <button onClick={scrollToBottom}>Contact Us</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }
