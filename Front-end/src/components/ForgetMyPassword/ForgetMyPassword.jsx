import React from 'react'
import PublicNavBar from '../PublicNavBar/PublicNavBar';
import Toastify from 'toastify-js';
import './ForgetMyPassword.css'

const ForgetMyPassword = () => {

    const showSuccessMessage = (message) => {
        Toastify({
          text: message,
          duration: 3000,
          close: true,
          style: {
            background: "#7ED957",
            color: "#26115"
          }
        }).showToast();
      };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const email = document.getElementById('forgetpasswordemail').value
        const response = await fetch('http://localhost:8080/api/sessions/sendresetpasswordemail',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": email
        }),}
        )
        if(response.ok){
            showSuccessMessage("Email de reestablecimiento de contraseña enviado con éxito")
        }
    };

  return (
    <div id='forget-my-password-page'>
        <PublicNavBar />
        <div className='Login-card'>
            <h2>Recuperá tu cuenta</h2>
            <p>Te enviaremos un email con instrucciones sobre cómo restablecer tu contraseña.</p>
            <form id="forget-my-password-form" action="" onSubmit={handleSubmit}>
                <input type="email" name="forgetpasswordemail" id="forgetpasswordemail" placeholder='Email' required/>
                <input type="submit" value="Enviar" />
            </form>
        </div>
    </div>
  )
}

export default ForgetMyPassword