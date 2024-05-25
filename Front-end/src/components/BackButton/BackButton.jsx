import React from 'react'
import './BackButton.css'
import { Link } from 'react-router-dom'

const BackButton = () => {
  return (
    <div className='back-button-container'>
        <Link to={"/home"}>Atras</Link>
    </div>
  )
}

export default BackButton