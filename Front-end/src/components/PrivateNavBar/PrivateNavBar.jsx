import React, { useState, useEffect } from 'react'
import './PrivateNavBar.css'
import { Link } from "react-router-dom"

const PrivateNavBar = () => {
  const [expanded, setExpanded] = useState(false);
  
  const navbarStyle = {
    minHeight: '95px',
    width: '100%',
    backgroundColor: '#261152',
    boxShadow: 'none',
    padding: '0px'
  };
  
  const containerStyle =   {
    height: '100px',
    maxWidth: '1280px',
    width: '90%',
  };
  
  return (
    <nav id="navigation-bar" className="navbar bg-* navbar-expand-lg sticky"  style={navbarStyle}>
      <div className="container-fluid" style={containerStyle}>
        <Link className="navbar-brand" to="/home">
          <img src="/FlixGO-logo.png" alt="Flixgo-logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-center${expanded ? ' show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/lists">Mis Listas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/search">Buscar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/userpanel">Mi Cuenta</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default PrivateNavBar