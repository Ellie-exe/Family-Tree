import React, { useState } from 'react';


const AuthContext = React.createContext({
    token: '',
    logout: () => {},
    login: (token) => {}
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null);
    };

    const login = (token) => {
        localStorage.setItem('token', token);
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