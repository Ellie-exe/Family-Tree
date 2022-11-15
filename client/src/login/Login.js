import React, { useEffect, useState, useContext } from 'react';
import styles from './Login.module.css';
import AuthContext from '../context/auth-context';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Login = (props) => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const onSuccess = (res) => {
        authCtx.login(res.credential);
        history.push('/feed');
        const user = jwt_decode(res.credential);
        localStorage.setItem('name', `${user.given_name} ${user.family_name}`)
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '740022531730-l28oie7e785fi8n676q35a6nns70lec1.apps.googleusercontent.com',
            callback: onSuccess
        });



        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: 'outline', size: 'large', width: '200'}
        );
    }, []);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.subhead}>Start reliving your family's history.</h1>
                <div id='signInDiv'></div>
            </div>
        </div>
    )
};

export default Login;