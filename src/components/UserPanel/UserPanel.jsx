import React from 'react'
import './UserPanel.css'
import BackButton from '../BackButton/BackButton'
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar'
import { Link } from 'react-router-dom'

const UserPanel = () => {
    //Acá habria que revisar la sesion del usuario para traer la información y autocompletar los campos

  return (
    <div className='user-panel'>
        <PrivateNavBar />
        <BackButton />
        <div className='user-card'>
            <h2>Detalles de cuenta</h2>
            <hr />
            <div>
              <div id='Email-container' className='edit-info-container'>
                <p><b>Email:</b> admin@flixgo.com</p>
                <button><span class="material-symbols-outlined">edit</span></button>
              </div>
              <hr />
              <div id='password-container' className='edit-info-container'>
                <p><b>Contraseña:</b> *********</p>
                <button><span class="material-symbols-outlined">edit</span></button>
              </div>
              <hr />
              <Link to={"/login"}>Cerrar sesión</Link>
            </div>
        </div>
    </div>
  )
}

export default UserPanel