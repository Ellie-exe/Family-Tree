import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './Login.css'

const Login = () => {
    const clientId = "186520065813-541as043cebcthf0j3571f7f575peqgv.apps.googleusercontent.com";

    const [isShown, setIsShown] = React.useState(false);

    const onSuccess = (res) => {
        console.log('success:', res);
        setIsShown(current => !current);
    };

    const onFailure = (err) => {
        console.log('failed:', err);
        setIsShown(current => !current);
    };

    return(
        <div>
            {!isShown && (
                <GoogleLogin className='center'
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}

            {isShown && (
                <div className='center'>
                    <h2>[Insert website here]</h2>
                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={onSuccess}
                    />
                </div>
            )}
        </div>
    )
};

export default Login;
