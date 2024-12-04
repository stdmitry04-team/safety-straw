import "../styles/our_mission.css";
import quotation from "../assets/quotation.svg"
import jack_and_zack from "../assets/jack_and_zack.svg"


export default function Our_mission() {
  return (
<div class="our_mission">
  <div class="our_mission-whitebox">
    <h1 class="our_mission-p">OUR MISSION</h1>
    <div class="content-wrapper">
      <img className="whitebox-quotation" src={quotation} alt="" />
      <div class="our_mission-text">
        Safety Straw's mission is to eliminate the number of date rape victims from the world. Our goal is to create a 
        <span class="text-color"> safer</span>, more 
        <span class="text-color"> secure</span> nightlife environment.
      </div>
    </div>
    <img className="jack_and_zack" src={jack_and_zack} alt="" />

  </div>
</div>
 
  );
}