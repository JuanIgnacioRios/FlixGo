import React from 'react'
import { Link } from 'react-router-dom'
import PublicNavBar from '../PublicNavBar/PublicNavBar'
import './Register.css'

const Login = () => {

  const handleSubmit = async (event) =>{
      event.preventDefault();
  
      const first_name = event.target.name.value;
      const last_name = event.target.surname.value;
      const username = event.target.username.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
  
      try {
        const response = await fetch('http://localhost:8080/api/sessions/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name,
            last_name,
            username,
            email,
            password
          }),
        });
  
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          window.location.href = "/login"
        }else{

        }
      } catch (error) {
        console.log(error)
        setErrorMessage('Error de red o servidor');
      }
    };
    
  return (
    <div id='Login-page'>
        <PublicNavBar />
        <div className='Login-card'>
            <h2>Registro</h2>
            <form id="login-form" method="post" action="/login" onSubmit={handleSubmit}>
            <input className="form-input" type="text" name="name" placeholder="Nombre"/>
                <input className="form-input" type="text" name="surname" placeholder="Apellido" required/>
                <input className="form-input" type="text" name="username" placeholder="Usuario" required/>
                <input className="form-input" type="email" name="email" placeholder="Email" required/>
                <input className="form-input" id="password" type="password" name="password" placeholder="Contraseña" required/>
                <input type="submit" value="Crear Usuario" />
                <Link to={"/login"}>Ya tengo cuenta</Link>
            </form>
        </div>
    </div>
  )
}

export default Login