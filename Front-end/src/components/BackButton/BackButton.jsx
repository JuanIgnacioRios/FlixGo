import React from 'react'
import './BackButton.css'
import { Link, useNavigate  } from 'react-router-dom'

const BackButton = () => {
  let navigate = useNavigate();
  const handleBackButton = () =>{
    if(navigate){
      navigate(-1)
    }else{
      window.location.href = "./home"
    }
  }
  return (
    <div className='back-button-container'>
        <Link onClick={handleBackButton}>Atras</Link>
    </div>
  )
}

export default BackButton