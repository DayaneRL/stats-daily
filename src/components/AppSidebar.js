import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logo } from 'src/assets/brand/logo'
import logo from 'src/assets/brand/logo_2.png'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'
import { AuthContext } from '../contexts/auth'
import { cilSettings } from '@coreui/icons'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [items, setItems] = useState(navigation);

  const {signed} = useContext(AuthContext);
  
  const _auth =  [
    {
      component: CNavTitle,
      name: 'Admin',
    },
    {
      component: CNavItem,
      name: 'Admin',
      to: '/admin',
      icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    },
  ];

  useEffect(()=>{
    if(signed){
      setItems([...navigation, ..._auth]);
    }
  },[signed]);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader>
        <CSidebarBrand to="/">
          <img src={logo} width={220}/>
          {/* <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} /> */}
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={items} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
