import React, { useState } from 'react';
import PublicNavBar from '../PublicNavBar/PublicNavBar';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Nuevo estado para controlar el estado de inicio de sesión

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username === 'admin' && password === 'flixgo') {
      // Si las credenciales son correctas, establece loggedIn a true
      setLoggedIn(true);
    } else {
      setErrorMessage('Usuario y/o contraseña incorrectos');
    }
  };

  // Si loggedIn es true, redirige a la página /home
  if (loggedIn) {
    window.location.href = '/home';
    return null; // Asegura que no haya nada que renderizar después de la redirección
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
                <p>Olvidé mi contraseña</p>
                <div id="to-register-container">
                  <p>¿No tenes cuenta?</p><Link to={"/register"}>Registrate</Link>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Login;
