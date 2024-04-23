import React, { useState, useEffect } from 'react'
import './PrivateNavBar.css'
import { Link, useParams } from "react-router-dom"

const PrivateNavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState('transparent');

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarBackground('#261152');
      } else {
        setNavbarBackground('transparent');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navbarStyle = {
    minHeight: '95px',
    width: '100%',
    backgroundColor: navbarBackground,
    boxShadow: 'none',
  };
  
  const containerStyle = {
    maxWidth: '1280px',
    width: '90%',
    maxWidth: '1280px',
  };
  
  return (
    <nav id="navigation-bar" className="navbar bg-* navbar-expand-lg sticky"  style={navbarStyle}>
      <div className="container-fluid" style={containerStyle}>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-center${expanded ? ' show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" href="/lists">Mis Listas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" href="#Aboutus-container"><span className="material-icons">account_circle</span></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default PrivateNavBar