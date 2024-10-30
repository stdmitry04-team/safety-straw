import "../styles/AboutUs.css";
export default function AboutUs() {
  const scrollToBottom = () => {
    const footerElement = document.getElementById("footer"); // Get the footer by ID
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" }); // Scroll to the footer smoothly
    }
  };
<<<<<<< HEAD
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
=======

  return (
    <div className="about-us">
      <div className="about-us-container">
        <div className="about-us-header">
          <h1>ABOUT US</h1>
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
        </div>
        <div className="about-us-content">
          <div className="about-us-left">
            <iframe src="https://www.youtube.com/embed/hC4Tc3nyhLg"></iframe>
          </div>
          <div className="about-us-right">
            <p className="about-us-text">
              We're Jack & Zak, childhood friends and co-founders of Safety
              Straw.
            </p>
            <p className="about-us-text">
              The company was born to create a safer environment for all and
              make a real difference. Want to find out more about our story?
            </p>
            <button className="contact" onClick={scrollToBottom}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
