import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const [authentication, setAuthentication] = useState(false);
    const [authenticationChecked, setAuthenticationChecked] = useState(false); // Nuevo estado para indicar si la autenticación ha sido verificada

    useEffect(() => {
        fetch(`http://localhost:8080/api/sessions/current`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Cookie.get('jwt')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.error) {
                setAuthentication(true);
            }
            setAuthenticationChecked(true); // Indicar que la autenticación ha sido verificada
        })
        .catch(err => console.log(err));
    }, []);

    // Verificar si la autenticación ha sido verificada
    if (!authenticationChecked) {
        // Muestra un componente de carga o un mensaje mientras se verifica la autenticación
        return <div>Cargando...</div>;
    }

    // Si la autenticación ha sido verificada y el usuario está autenticado, mostrar children
    if (authentication) {
        return children;
    } else {
        // Si la autenticación ha sido verificada pero el usuario no está autenticado, redirigir a /login
        window.location.href = "/login";
        return null; // Esto podría no ser necesario, pero es una buena práctica
    }
};

export default PrivateRoute;
