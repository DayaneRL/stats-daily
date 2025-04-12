import React from 'react'
import { Route, Routes as RouterRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { isAuthenticated } from '../utility/Utils'

// Containers
const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('../views/pages/login/Login'))
const Register = React.lazy(() => import('../views/pages/register/Register'))
const Page404 = React.lazy(() => import('../views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('../views/pages/page500/Page500'))

//views
const Tracks = React.lazy(() => import('../views/tracks/Tracks'))
const Profile = React.lazy(() => import('../views/pages/profile/Profile'))
const Settings = React.lazy(() => import('../views/pages/settings/Settings'))
const Admin = React.lazy(() => import('../views/admin/Admin'))

export default function Routes(){
    return(
        <RouterRouter>
            <Route exact path="/login" name="Login Page" element={<Login />} loader={async () => await isAuthenticated()}/>
            <Route exact path="/register" name="Register Page" element={<Register />} loader={async () => await isAuthenticated()}/>

            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            
            <Route element={<PrivateRoute/>}>
                <Route path="/admin" name="Admin" element={<Admin />} />
            </Route>
            
            <Route path="*" name="Home" element={<DefaultLayout />} />
        </RouterRouter>
    )
}