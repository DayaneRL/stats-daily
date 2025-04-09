import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilMusicNote,
  cilVoiceOverRecord,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

//fazer navbar e componentes pras rotas
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'Base',
  },
  {
    component: CNavGroup,
    name: 'Tracks',
    to: '/tracks',
    icon: <CIcon icon={cilMusicNote} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Track',
        to: '/tracks/create',
      },
      {
        component: CNavItem,
        name: 'List Tracks',
        to: '/tracks/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Artist',
    to: '/artists',
    icon: <CIcon icon={cilVoiceOverRecord} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Artist',
        to: '/artists/create',
      },
      {
        component: CNavItem,
        name: 'Track List',
        to: '/artists/list',
      },
    ],
  },
]

export default _nav
