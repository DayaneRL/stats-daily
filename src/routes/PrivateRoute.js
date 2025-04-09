import { useContext } from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom';
import {AuthContext} from '../contexts/auth';

export const PrivateRoute = ({children}) => {
    
    const {signed, loading} = useContext(AuthContext);

    if(loading){
        return(
            <div></div>
        )
    }

    return signed ? children : <Navigate to="/" />;
}