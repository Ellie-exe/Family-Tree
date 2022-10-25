import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = (clientId) => {
  return(<GoogleLogin clientId={clientId}/>)
};

export default Login;