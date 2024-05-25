import React from 'react'
import PublicNavBar from '../PublicNavBar/PublicNavBar';
import './ForgetMyPassword.css'

const ForgetMyPassword = () => {

    const handleSubmit = (e) =>{
        e.preventDefault(),
        window.location.href = "/login"
    };

  return (
    <div id='forget-my-password-page'>
        <PublicNavBar />
        <div className='Login-card'>
            <h2>Recuperá tu cuenta</h2>
            <p>Te enviaremos un email con instrucciones sobre cómo restablecer tu contraseña.</p>
            <form id="forget-my-password-form" action="" onSubmit={handleSubmit}>
                <input type="email" name="forgetpasswordemail" id="forgetpasswordemail" placeholder='Email' />
                <input type="submit" value="Enviar" />
            </form>
        </div>
    </div>
  )
}

export default ForgetMyPassword