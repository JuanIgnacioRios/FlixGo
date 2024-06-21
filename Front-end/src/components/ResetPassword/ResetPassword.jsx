import React, { useState, useEffect } from 'react'
import PublicNavBar from '../PublicNavBar/PublicNavBar'

const ResetPassword = () => {
    const [user, setUser] = useState(null)
    let query = new URLSearchParams(window.location.search)
    const token = query.get("token")

    useEffect(() => {
        fetch(`http://localhost:8080/api/sessions/current`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUser(data)
        })
        .catch(err => console.log(err));
    }, [user]);

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

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const password = document.getElementById('password1').value
        const password2 = document.getElementById('password2').value
        if(password != password2) return showErrorMessage("Las contraseñas ingresadas son diferentes")
        const response = await fetch(`http://localhost:8080/api/users/changepassword/${user.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          "password": password
        }),}
        )
        if(response.ok){
            showSuccessMessage("Contraseña reestablecida con éxito")
            window.location.href = '/login'
        }else{
            showErrorMessage("No se pudo reestablecer la contraseña")
        }
    };

    if(!user){
        return(
            <h1>Link de recupero de contraseña expiro</h1>
        )
    }
  return (
    <div id='reset-password-page'>
        <PublicNavBar />
        <div className='Login-card'>
            <h2>Reestablece tu contraseña</h2>
            <p>Hola {user.name}, ingrese su nueva contraseña</p>
            <form id="forget-my-password-form" action="" onSubmit={handleSubmit}>
                <input type="password" name="password1" id="password1" placeholder='Nueva contraseña' required/>
                <input type="password" name="password2" id="password2" placeholder='Repita su nueva contraseña' required/>
                <input type="submit" value="Enviar" />
            </form>
        </div>
    </div>
  )
}

export default ResetPassword