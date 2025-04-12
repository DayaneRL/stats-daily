import { useContext } from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom';
import {AuthContext} from '../contexts/auth';

export const PrivateRoute = () => {
    
    const {signed, loading} = useContext(AuthContext);

    if(loading){
        return(
            <div></div>
        )
    }
    
    return signed ? <Outlet /> : <Navigate to="/" />;
}