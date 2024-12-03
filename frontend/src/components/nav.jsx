import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'
import logo_text from '../assets/logo-text.svg'
import mobileLogoText from '../assets/mobile-logo-text.svg'
import profileIcon from '../assets/profile.svg'
import menuIcon from '../assets/menu.svg'
import '../styles/navbar.css'; 
import WaitlistModal from './WaitlistModal';

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
  };

  const topFunction = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  };

  const scrollToAboutUs = (e) => {
    e.preventDefault();
    const footer = document.querySelector('.about-us');
    
    if (footer) {
      const start = window.pageYOffset;
      const target = footer.getBoundingClientRect().top + start;
      const duration = 2000;
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
    setDropdownOpen(false);
  };

  return (
      <nav className="navbar">
          <div className="navbar-left">
              <Link to="/" className="navbar-logo" onClick={topFunction}>
                  <img src={logo} alt="Safety Straw Logo" className="logo-image" />
                  <img src={logo_text} alt="Safety Straw Logo" className="logo-text desktop-logo-text"/>
                  <img src={mobileLogoText} alt="Safety Straw Logo" className="logo-text mobile-logo-text" />
              </Link>
          </div>

          <div className="navbar-right">
              <div className="desktop-links">
                  <a href="#footer" className="nav-link" onClick={scrollToAboutUs}>About Us</a>
                  <Link to="/checkout" className="nav-link">Order Now</Link>
                  <button onClick={openModal} className="join-btn">Get updates</button>
              </div>

              <button className="menu-toggle-btn" onClick={toggleDropdown}>
                  <img src={menuIcon} alt="Menu Icon" className="menu-icon" />
              </button>
          </div>

          {isDropdownOpen && (
              <div className="dropdown-menu">
                  <a href="#footer" className="nav-link" onClick={scrollToAboutUs}>About Us</a>
                  <Link 
                      to="/checkout" 
                      className="nav-link" 
                      onClick={() => setDropdownOpen(false)}
                  >
                      Order Now
                  </Link>
                  <button onClick={openModal} className="join-btn">Get updates</button>
              </div>
          )}

          <WaitlistModal isOpen={isModalOpen} onClose={closeModal}/>
      </nav>
  );
}

export default Navbar;