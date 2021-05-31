import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCheckAuth } from '../../hooks/useCheckAuth';

// @ts-ignore
const AuthWrapper = (props) => {
    const checkAuth = useCheckAuth();
    console.log({ props })

    if (checkAuth()) {
        return (
            <Route exact={props.exact} path={props.path}>
                {props.children}
            </Route>
        )
    } else {
        return <Redirect to='/login' />
    }
}

export default AuthWrapper;