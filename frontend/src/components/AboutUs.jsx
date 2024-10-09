import "../styles/AboutUs.css";
export default function AboutUs() {
    return (
        <div className="container">
            <div className="top">
                <div className="about-us">
                    <h1>
                        ABOUT US
                    </h1>
                </div>
                
            </div>
            <div className="bottom">
                <div className="left">
                    <iframe src="https://www.youtube.com/embed/hC4Tc3nyhLg"></iframe>
                </div>
                <div className="right">
                    <div className="text">
                        <p>
                            We're Jack & Zak, childhood friends and co-founders of Safety Straw
                        </p>
                        <br></br>
                        <p>
                            The company was born to create a safer environment for all and make a real difference. Want to find out more about our story?
                        </p>
                    </div>
                    <div className="contact">
                        <button>Contact Us</button>

                    </div>

                </div>
                

            </div>
          
        
        </div>
    );
    }
