import React, { useContext, useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
  cilUserPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar1 from './../../assets/images/avatars/1.jpg'
import userDefault from './../../assets/images/avatars/profile.png'
import { AuthContext } from '../../contexts/auth'

const AppHeaderDropdown = () => {
  
  const [avatar, setAvatar] = useState(userDefault);
  const {signed, user, logout} = useContext(AuthContext);

  const handleLogout = () => {
    logout()
  }

  useEffect(()=>{
    if(user?.photoURL){
      setAvatar(user.photoURL)
    }
  },[user?.photoURL]);

  return (
    <CDropdown variant="nav-item">
      <div className='d-flex align-items-center'>
        <span><b>{user.displayName}</b></span>
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {signed ? (
          <>
            <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Settings</CDropdownHeader>
            <CDropdownItem href="#/profile">
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
            <CDropdownItem href="#" disabled>
              <CIcon icon={cilSettings} className="me-2" />
              Settings
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem href="#" onClick={handleLogout}>
              <CIcon icon={cilAccountLogout} className="me-2" />
              Logout
            </CDropdownItem>
          </>
        ):(
          <>
            <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
            <CDropdownItem href="#/login">
              <CIcon icon={cilUser} className="me-2" />
              Login
            </CDropdownItem>
            <CDropdownItem href="#/register">
              <CIcon icon={cilUserPlus} className="me-2" />
              Register
            </CDropdownItem>
          </>
        )}
      </CDropdownMenu>
      
      </div>
    </CDropdown>
  )
}

export default AppHeaderDropdown
