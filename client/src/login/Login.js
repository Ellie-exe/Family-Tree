import React, { useEffect, useState, useContext } from 'react';
import styles from './Login.module.css';
import AuthContext from '../context/auth-context';

const Login = (props) => {
    const authCtx = useContext(AuthContext);

    const onSuccess = (res) => {
        document.getElementById('signInDiv').hidden = true;
        authCtx.login(res.credential);
    };

    const logout = () => {
        authCtx.logout();
        document.getElementById('signInDiv').hidden = false;
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '740022531730-l28oie7e785fi8n676q35a6nns70lec1.apps.googleusercontent.com',
            callback: onSuccess
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: 'outline', size: 'large', width: '200'}
        );
    }, [])

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                {/*<h1 className={styless.header}>Log in to FamilTree</h1>*/}
                <h1 className={styles.subhead}>Start reliving your family's history.</h1>
                <div id='signInDiv'></div>
                {authCtx.token !== '' && <button onClick={logout}>sign out</button>}
            </div>
        </div>
    )
};

export default Login;