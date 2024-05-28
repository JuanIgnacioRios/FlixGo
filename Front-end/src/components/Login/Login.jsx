import React, { useState } from 'react';
import PublicNavBar from '../PublicNavBar/PublicNavBar';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:8080/api/sessions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        }),
      });

      console.log(response)
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data)
        setLoggedIn(true)
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.log(error)
      setErrorMessage('Error de red o servidor');
    }
  };

  if (loggedIn) {
    window.location.href = '/home';
    return null;
  }

  return (
    <div id='Login-page'>
      <PublicNavBar />
      <div className='Login-card'>
        <h2>Iniciar Sesión</h2>
        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        <form id="login-form" onSubmit={handleLogin}>
          <input 
            type="text" 
            name="username" 
            placeholder="Usuario"
          />
          <div id='password-input-section'>
            <input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              name="password" 
              placeholder="Contraseña"
            />
            <section>
              <span 
                className="material-symbols-outlined" 
                id="eye-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </section>
          </div>
          <input type="submit" value="Ingresar" />
          <Link to={"/forgetpassword"}>Olvidé mi contraseña</Link>
          <div id="to-register-container">
            <p>¿No tenes cuenta?</p><Link to={"/register"}>Registrate</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
