import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard.js'))
const Tracks = React.lazy(() => import('./views/tracks/Tracks.js'))
const CreateTracks = React.lazy(() => import('./views/tracks/Create/Create.js'))
const Artists = React.lazy(() => import('./views/artists/Artists.js'))
const CreateArtists = React.lazy(() => import('./views/artists/Create.js'))
const Profile = React.lazy(() => import('./views/pages/profile/Profile'))
const Settings = React.lazy(() => import('./views/pages/settings/Settings'))
const Admin = React.lazy(() => import('./views/admin/Admin'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/tracks/list', name: 'List Tracks', element: Tracks },
  { path: '/tracks/create', name: 'Create Track', element: CreateTracks },
  { path: '/artists/list', name: 'List Artists', element: Artists },
  { path: '/artists/create', name: 'Create Artist', element: CreateArtists },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/settings', name: 'Settings', element: Settings },
  { path: '/admin', name: 'Admin', element: Admin },
]

export default routes
