import "../styles/video.css";
import video_background from "../assets/video-background.svg"
export default function Video() {
  return (

    <div className="video">
        <img src={video_background} className="video-background"></img>  
        <iframe 
        src="https://www.youtube.com/embed/hC4Tc3nyhLg" 
        frameborder="0" allowfullscreen
        >
        </iframe>
    </div>
  );
}