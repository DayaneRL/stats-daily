import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard.js'))
const Tracks = React.lazy(() => import('./views/tracks/Tracks.js'))
const Artists = React.lazy(() => import('./views/artists/Artists.js'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/tracks', name: 'Tracks', element: Tracks },
  { path: '/artists', name: 'Artists', element: Artists },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
