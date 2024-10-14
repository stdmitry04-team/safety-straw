import { useState } from 'react';
import logo from '../assets/logo.svg'
import logo_text from '../assets/logo-text.svg'
import profileIcon from '../assets/profile.svg'
import menuIcon from '../images/menu.png'
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

    return (
        <nav className="navbar">
          <div className="navbar-left">
            <a href="#" className="navbar-logo" onClick={topFunction}>
              <img src={logo} alt="Safety Straw Logo" className="logo-image" />
              <img src={logo_text} alt="Safety Straw Logo" className="logo-text" />
            </a>
          </div>
    
    
          <div className="navbar-right">
            <div className="desktop-links">
                <a href="#" className="nav-link">About Us</a>
                <a href="#" className="nav-link">Merchandise</a>
                <button className="nav-link btn-link">Bar Locator</button>
                <button className="nav-link btn-link">Blog</button>
                <button onClick={openModal} className="join-btn">Join Waitlist</button>
                
            </div>
            
          
            <img src={profileIcon} alt="User Profile" className="profile-icon" />

            <button className="menu-toggle-btn" onClick={toggleDropdown}>
            <img src={menuIcon} alt="Menu Icon" className="menu-icon" />
            </button>
          </div>

          {isDropdownOpen && (
          <div className="dropdown-menu">
            <a href="#" className="nav-link" onClick={topFunction}>SAFETY STRAW</a>
            <a href="#" className="nav-link" onClick={() => setDropdownOpen(false)}>About Us</a>
            <a href="#" className="nav-link" onClick={() => setDropdownOpen(false)}>Merchandise</a>
            <button className="nav-link btn-link" onClick={() => setDropdownOpen(false)}>Bar Locator</button>
            <button className="nav-link btn-link" onClick={() => setDropdownOpen(false)}>Blog</button>
          </div>
        )}

        <WaitlistModal isOpen={isModalOpen} onClose={closeModal}/>
        </nav>

        
      );
    }

  export default Navbar;