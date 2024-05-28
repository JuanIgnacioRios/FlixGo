import React, { useState, useEffect } from 'react';
import './UserPanel.css';
import BackButton from '../BackButton/BackButton';
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Toastify from 'toastify-js'

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

  const showMessage = (message) => {
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
  const changeUserInfo = async (modalType, event) =>{
    console.log(event)
    event.preventDefault();
    console.log("entro",modalType)
      if(modalType == "email"){
        const newEmail = document.getElementById('edit-input').value;
        console.log("entro",newEmail)
        try{
          const response = await fetch(`http://localhost:8080/api/users/changeemail/${user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": newEmail
          }),
          });
          console.log(response)
        }catch(error){
          console.log(error)
        }
      }
    

    }

  console.log(user)

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
                <b>Email:</b> 
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
            <Link to={'/login'}>Cerrar sesión</Link>
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
          <input className='password-input' type={modalType} placeholder='Ingrese su nueva contraseña' />
          <input className='password-input' type={modalType} placeholder='Repita su nueva contraseña'/>
        </Modal.Body>
        )

        }
        <Modal.Footer>
          <Button variant='secondary' onClick={hideModal} className='close-modal'>
            Cerrar
          </Button>
          <Button 
            variant='primary' 
            onClick={(event) => { // Quita el parámetro event
              changeUserInfo(modalType, event); // Quita event aquí
              hideModal(); 
              showMessage(`Cambio de ${modalName} realizado con exito`);
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