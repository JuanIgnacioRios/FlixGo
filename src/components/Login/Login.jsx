import React from 'react'
import PublicNavBar from '../PublicNavBar/PublicNavBar'
import './Login.css'

const Login = () => {
  return (
    <div id='Login-page'>
        <PublicNavBar />
        <div className='Login-card'>
            <h2>Iniciar Sesión</h2>
            <form id="login-form" method="post" action="/login">
                <input type="text" name="username" placeholder="Usuario"/>
                <div>
                    <input id="password" type="password" name="password" placeholder="Contraseña"/>
                    <section><span className="material-symbols-outlined" id="eye-button">visibility</span></section>
                </div>
                <input type="submit" value="Ingresar" />
                <p>Olvidé mi contraseña</p>
            </form>
        </div>
    </div>
  )
}

export default Login