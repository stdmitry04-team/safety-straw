import "../styles/AboutUs.css";
export default function AboutUs() {

// Or using custom JavaScript animation - More control
const scrollToBottom = () => {
  const footerElement = document.getElementById("footer");
  
  if (footerElement) {
    const start = window.pageYOffset;
    const target = footerElement.getBoundingClientRect().top + start;
    const duration = 2000; // 2 seconds - increase this for slower animation
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, start + (target - start) * easeInOutCubic(progress));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(animation);
  }
};

  return (
    <div className="about-us">
      <div className="about-us-container">
        <div className="about-us-header">
          <h1>ABOUT US</h1>
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
