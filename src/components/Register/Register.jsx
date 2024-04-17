import React from 'react'
import PublicNavBar from '../PublicNavBar/PublicNavBar'
import './Register.css'

const Login = () => {
  return (
    <div id='Login-page'>
        <PublicNavBar />
        <div className='Login-card'>
            <h2>Registro</h2>
            <form id="login-form" method="post" action="/login">
                <input className="form-input" type="text" name="username" placeholder="Usuario"/>
                <input className="form-input" type="email" name="email" placeholder="Email"/>
                <input className="form-input" id="password" type="password" name="password" placeholder="Contraseña"/>
                <input className="form-input" type="text" name="name" placeholder="Nombre"/>
                <input className="form-input" type="text" name="surname" placeholder="Apellido"/>
                <input type="submit" value="Crear Usuario" />
                <p>Ya tengo usuario</p>
            </form>
        </div>
    </div>
  )
}

export default Login