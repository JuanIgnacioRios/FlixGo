import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const [authentication, setAuthentication] = useState(false);
    const [authenticationChecked, setAuthenticationChecked] = useState(false);

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
            setAuthenticationChecked(true);
        })
        .catch(err => console.log(err));
    }, []);

    if (!authenticationChecked) {
        return <div>Cargando...</div>;
    }

    if (authentication) {
        return children;
    } else {
        window.location.href = "/login";
        return null;
    }
};

export default PrivateRoute;
