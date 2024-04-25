import React from 'react'
import './UserPanel.css'
import BackButton from '../BackButton/BackButton'
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar'

const UserPanel = () => {
    //Acá habria que revisar la sesion del usuario para traer la información y autocompletar los campos

  return (
    <div className='user-panel'>
        <PrivateNavBar />
        <BackButton />
        <div className='user-card'>
            <h2>Detalles de cuenta</h2>
            <form id='edit-user-detail-form' method='put' action="/updateuserinfo">
                <input className="form-input" type="email" name="email" placeholder="Email del usuario"/>
                <input className="form-input" id="password" type="password" name="password" placeholder="Contraseña del usuario hasheada"/>
                <input className="form-input" type="text" name="name" placeholder="Nombre  del usuario"/>
                <input className="form-input" type="text" name="surname" placeholder="Apellido  del usuario"/>
                <input type="submit" value="Editar Usuario" />
                <p>Cerrar sesión</p>
            </form>
        </div>
    </div>
  )
}

export default UserPanel