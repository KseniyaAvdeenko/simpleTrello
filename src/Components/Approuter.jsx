import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {publicRoutes, privateRoutes} from "../router/routes";

const AppRouter = () => {
    const auth = useAuth()
    const loggedRoutes = () => {
        return (
            <Routes>
                {publicRoutes.map(route => (
                    <Route
                        key={route.id}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                    />
                ))}
                {privateRoutes.map(route => (
                    <Route
                        key={route.id}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                    />
                ))}
                <Route path="*" element={<Navigate to="/profile/"/>}/>
            </Routes>
        )
    }
    const guestsRoutes = () => {
        return (<Routes>
            {publicRoutes.map(route => (
                <Route
                    key={route.id}
                    path={route.path}
                    element={route.element}
                    exact={route.exact}
                />
            ))}
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>)
    }
    return (
        auth.isAuth
            ? loggedRoutes()
            : guestsRoutes()
    );
};

export default AppRouter;
