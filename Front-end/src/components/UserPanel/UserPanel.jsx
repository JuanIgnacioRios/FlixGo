import React, { useState, useEffect } from 'react';
import './UserPanel.css';
import BackButton from '../BackButton/BackButton';
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Toastify from 'toastify-js'
import Cookie from 'js-cookie'

const UserPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalName,setModalName] = useState('')
  const [modalTitle, setModalTitle] = useState('');
  const [modalLabel, setModalLabel] = useState('');
  const [modalType, setModalType] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(JSON.parse(storedUser))
  }, []);

  const showEditModal = (element) => {
    setModalName(element)
    setModalTitle(`Editar ${element}`);
    setModalLabel(`Nuevo ${element}`);
    if (element === 'Email') {
      setModalType('email');
    } else if (element === 'Contraseña') {
      setModalType('password');
    } else {
      setModalType('text');
    }
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

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

  const showErrorMessage = (message) => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      style: {
        background: "#FF0000",
        color: "#FFFFFF"
      }
    }).showToast();
};

  const changeUserInfo = async (modalType, event) =>{
    event.preventDefault();
      if(modalType == "email"){
        const newEmail = document.getElementById('edit-input').value;
        if(newEmail == "") return showErrorMessage(`Error al realizar el cambio de email. No se ingreso un nuevo email`)
        try{
          const response = await fetch(`http://localhost:8080/api/users/changeemail/${user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('jwt')}`
          },
          body: JSON.stringify({
            "email": newEmail
          }),
          });
          if(response.ok){
            let userToUpdate = JSON.parse(localStorage.getItem('user'))
            userToUpdate.email = newEmail
            setUser(userToUpdate);
            localStorage.setItem('user', JSON.stringify(userToUpdate))
            showSuccessMessage(`Cambio de email realizado con exito`);
          }else{
            showErrorMessage(`Error al realizar el cambio de email. Por favor vuelva a intentarlo`)
          }
        }catch(error){
          console.log(error)
        }
      }else{
        const newPassword = document.getElementById('password-input1').value
        const newPassword2 = document.getElementById('password-input2').value
        if (newPassword != newPassword2) return showErrorMessage(`Las contraseñas ingresadas no son iguales`)
        if(newPassword == "") return showErrorMessage(`Error al realizar el cambio de contraseña. No se ingreso un nueva  nueva constraseña`)
        try{
          const response = await fetch(`http://localhost:8080/api/users/changepassword/${user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('jwt')}`
          },
          body: JSON.stringify({
            "password": newPassword
          }),
          });
          if(response.ok){
            showSuccessMessage(`Cambio de contraseña realizado con exito`);
          }else{
            showErrorMessage(`Error al realizar el cambio de contraseña. Por favor vuelva a intentarlo`)
          }
        }catch(error){
          console.log(error)
        }
      }
    }

    const handleLogout = () => {
      Cookie.remove('jwt');
      localStorage.clear();
    };

  if(!user){
    return <div>Loading...</div>
  }

  return (
    <>
      <PrivateNavBar />
      <div className='user-panel'>
        <BackButton />
        <div className='user-card'>
          <h2>Detalles de cuenta</h2>
          <hr />
          <div>
            <div id='Email-container' className='edit-info-container'>
              <p>
                <b>Email: {user.email}</b> 
              </p>
              <button onClick={() => showEditModal('Email')}>
                <span className='material-symbols-outlined'>edit</span>
              </button>
            </div>
            <hr />
            <div id='password-container' className='edit-info-container'>
              <p>
                <b>Contraseña:</b> *********
              </p>
              <button onClick={() => showEditModal('Contraseña')}>
                <span className='material-symbols-outlined'>edit</span>
              </button>
            </div>
            <hr />
            <Link to={'/login'} onClick={handleLogout}>Cerrar sesión</Link>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        {modalType == "email" ? (
        <Modal.Body>
          <input id='edit-input' type={modalType} placeholder='Ingrese su nuevo email'/>
        </Modal.Body>
        ) : (
          <Modal.Body>
          <input id='password-input1'className='password-input' type={modalType} placeholder='Ingrese su nueva contraseña' />
          <input id='password-input2' className='password-input' type={modalType} placeholder='Repita su nueva contraseña'/>
        </Modal.Body>
        )

        }
        <Modal.Footer>
          <Button variant='secondary' onClick={hideModal} className='close-modal'>
            Cerrar
          </Button>
          <Button 
            variant='primary' 
            onClick={(event) => {
              changeUserInfo(modalType, event);
              hideModal(); 
            }}  
            className='savechanges-modal'>
              Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserPanel;