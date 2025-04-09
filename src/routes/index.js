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

//views
const Tracks = React.lazy(() => import('../views/tracks/Tracks'))
const Profile = React.lazy(() => import('../views/pages/profile/Profile'))
const Settings = React.lazy(() => import('../views/pages/settings/Settings'))

export default function Routes(){
    return(
        <RouterRouter>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />

            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            
            {/* <Route exact path='/tracks' element={<PrivateRoute/>}>
                <Route exact path="/tracks" name="Tracks" element={<Tracks />} />
            </Route> */}

            <Route exact path="#/tracks" name="Tracks" element={<Tracks />} />
            <Route exact path="#/profile" name="Profile" element={<Profile />} />
            <Route exact path="#/settings" name="Settings" element={<Settings />} />
            
            <Route path="*" name="Home" element={<DefaultLayout />} />
        </RouterRouter>
    )
}