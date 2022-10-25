import React from 'react';
import { GoogleLogin } from 'react-google-login';
import styles from './Login.module.css';

const Login = (props) => {
  return(
      <div className={styles.container}>
        <h1>Log in to FamilTree</h1>
        <GoogleLogin clientId={props.clientId}/>
      </div>
  )
};

export default Login;