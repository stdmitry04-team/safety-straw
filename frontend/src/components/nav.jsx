import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'
import logo_text from '../assets/logo-text.svg'
import mobileLogoText from '../assets/mobile-logo-text.svg'
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
            <Link to="/" className="navbar-logo" onClick={topFunction}>
              <img src={logo} alt="Safety Straw Logo" className="logo-image" />
              <img src={logo_text} alt="Safety Straw Logo" className="logo-text desktop-logo-text"/>
              <img src={mobileLogoText} alt="Safety Straw Logo" className="logo-text mobile-logo-text" />
            </Link>
          </div>
    
    
          <div className="navbar-right">
            <div className="desktop-links">
                <Link to="#footer" className="nav-link" onClick={() => setDropdownOpen(false)}>About Us</Link>
                <Link to="/checkout" className="nav-link">Order Now</Link>
                {/* <button className="nav-link btn-link">Bar Locator</button> */}
                {/* <button className="nav-link btn-link">Blog</button> */}
                <button onClick={openModal} className="join-btn">Get updates</button>
                
            </div>
            
          
            {/* <img src={profileIcon} alt="User Profile" className="profile-icon" /> */}

            <button className="menu-toggle-btn" onClick={toggleDropdown}>
            <img src={menuIcon} alt="Menu Icon" className="menu-icon" />
            </button>
          </div>

          {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/" className="nav-link" onClick={topFunction}>SAFETY STRAW</Link>
            <Link to="#footer" className="nav-link" onClick={() => setDropdownOpen(false)}>About Us</Link>
            <Link to="#" className="nav-link" onClick={() => setDropdownOpen(false)}>Order Now</Link>
            {/* <button className="nav-link btn-link" onClick={() => setDropdownOpen(false)}>Bar Locator</button> */}
            {/* <button className="nav-link btn-link" onClick={() => setDropdownOpen(false)}>Blog</button> */}
          </div>
        )}

        <WaitlistModal isOpen={isModalOpen} onClose={closeModal}/>
        </nav>

      );
    }

  export default Navbar;