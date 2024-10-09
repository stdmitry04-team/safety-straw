import "../styles/our_mission.css";
import quotation from "../assets/quotation.svg"
import amp from "../assets/amp.svg"
import jack_and_zack from "../assets/jack_and_zack.svg"


export default function Our_mission() {
  return (
    <div className="our_mission">
      <div className="our_mission-whitebox">
        <img className="whitebox-quotation" src={quotation} alt="" />
        <p className="our_mission-p">OUR MISSION</p>
        <h1 className="our_mission-text">Safety Straw’s mission is to eliminate the number of <br />date rape victims from the world. Our goal is to <br /> create a <span className="text-color">safer</span>, more <span className="text-color">secure</span> nightlife environment.”</h1>
        <img className="jack_and_zack" src={jack_and_zack} alt="" />
      </div>
    </div>
 
  );
}
