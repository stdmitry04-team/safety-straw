import React, { useEffect, useState } from "react";
import "../styles/background.css";

export default function Background() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const redPercentage = Math.min(100, 12.6 + scrollY / 50);
  const yellowPercentage = Math.min(100, 99.99 + scrollY / 50);

  return (
    <div
      className="background"
      style={{
        background: `linear-gradient(360deg, #DC5647 ${redPercentage}%, #FCD678 ${yellowPercentage}%)`,
      }}
    ></div>
  );
}
