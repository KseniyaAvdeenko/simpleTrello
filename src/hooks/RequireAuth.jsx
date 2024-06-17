import {useLocation, Navigate} from 'react-router-dom'

const RequireAuth = ({children}) => {
    const location = useLocation();

    const loggedUser  = localStorage.loggedUser;
    if (!loggedUser) {
        return <Navigate to='/' state={{from: location}}/>
    }
    return children;
}

export {RequireAuth};