import {createContext, useState} from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(localStorage.isAuth ? JSON.parse(localStorage.isAuth): false)
    const [loggedUser, setLoggedUser] = useState(localStorage.loggedUser ? JSON.parse(localStorage.loggedUser):null);
    const logIn = (user) => {
        setLoggedUser(user)
        localStorage.setItem('loggedUser', JSON.stringify(user));
        localStorage.setItem('isAuth', JSON.stringify(true))
        setIsAuth(true)
    }

    const logOut = () => {
        setLoggedUser(null)
        localStorage.removeItem('loggedUser');
        localStorage.setItem('isAuth', JSON.stringify(false))
        setIsAuth(false)
    }

    const value = {logIn, logOut, isAuth, loggedUser}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};