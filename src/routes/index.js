import React from 'react'
import { Route, Routes as RouterRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'

// Containers
const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('../views/pages/login/Login'))
const Register = React.lazy(() => import('../views/pages/register/Register'))
const Page404 = React.lazy(() => import('../views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('../views/pages/page500/Page500'))


// import Login from '../views/pages/login/Login';

export default function Routes(){
    return(
        <RouterRouter>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path='/404' element={<PrivateRoute/>}>
                <Route exact path="/404" name="Page 404" element={<Page404 />} />
            </Route>
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
        </RouterRouter>
    )
}