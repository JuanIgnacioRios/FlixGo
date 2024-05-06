import React from 'react'
import { Link } from 'react-router-dom'
import PublicNavBar from '../PublicNavBar/PublicNavBar'
import './Register.css'

const Login = () => {

  const handleSubmit = (e) =>{
    e.preventDefault(),
    window.location.href = "/login"
};
  return (
    <div id='Login-page'>
        <PublicNavBar />
        <div className='Login-card'>
            <h2>Registro</h2>
            <form id="login-form" method="post" action="/login" onSubmit={handleSubmit}>
            <input className="form-input" type="text" name="name" placeholder="Nombre"/>
                <input className="form-input" type="text" name="surname" placeholder="Apellido"/>
                <input className="form-input" type="text" name="username" placeholder="Usuario"/>
                <input className="form-input" type="email" name="email" placeholder="Email"/>
                <input className="form-input" id="password" type="password" name="password" placeholder="Contraseña"/>
                <input type="submit" value="Crear Usuario" />
                <Link to={"/login"}>Ya tengo cuenta</Link>
            </form>
        </div>
    </div>
  )
}

export default Login