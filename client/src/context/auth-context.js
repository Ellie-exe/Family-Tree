import React, { useState } from 'react';


const AuthContext = React.createContext({
    token: '',
    logout: () => {},
    login: (token) => {}
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState('');

    const logout = () => {
        setToken('');
    };

    const login = (token) => {
        setToken(token);
    };

    const contextValue = {
        token: token, logout: logout, login: login
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;