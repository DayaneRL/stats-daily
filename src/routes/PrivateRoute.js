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

    // if(!signed && isPrivate){//se tentar acessar rota sem logar
    //     return <Navigate to="/"/>
    // }

    //se ta logado e tentou acessar tela nao privada
    // if(signed && !isPrivate && 
    //     rest.path!=='/categorias' && rest.path!=='/autores' && rest.path!=='/novoPost'){
    //     return <Navigate to="/painel"/>
    // }

    // return(
    //     <Route {...rest}
    //         render={ props => (
    //             <Component {...props}/>
    //         )}
    //     />
    // )
    return signed ? <Outlet /> : <Navigate to="/" />;
}