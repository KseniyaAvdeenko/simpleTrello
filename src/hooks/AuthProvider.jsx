import {createContext, useState} from 'react';
import {Navigate} from "react-router-dom";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false)
    const [loggedUser, setLoggedUser] = useState(null);
    const logIn = (user) => {
        setLoggedUser(user)
        localStorage.setItem('loggedUser', user);
        //localStorage.setItem('isAuth', 'true')
        setIsAuth(true)
    }

    const logOut = () => {
        setLoggedUser(null)
        localStorage.removeItem('loggedUser');
        //localStorage.removeItem('isAuth')
        setIsAuth(false)
    }

    const value = {logIn, logOut, isAuth, loggedUser}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};