import "../styles/our_mission.css";
import quotation from "../assets/quotation.svg"
import amp from "../assets/amp.svg"

export default function Our_mission() {
  return (

    <div className="our_mission">
        <h1> OUR MISSION </h1>
        <img class='quotation' src={quotation} alt="" />
        <div className="mission_text">
          { <p>Safety Straw’s mission is to eliminate the number of<br />date rape victims from the world. Our goal is to<br />create a <span className="highlight">safer</span>, more <span className="highlight">secure</span> nightlife environment."</p>}
        </div>
        { /*<p className="author"> ~ Jack & Zak </p>*/ }
        <p className="author">
          <span className="tilde">~</span>
          <span className="jack-zak">Jack & Zak</span>
        </p>
        </div>
 
  );
}