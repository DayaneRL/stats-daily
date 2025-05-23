import React, { useContext, useEffect, useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilSettings,
  cilUser,
  cilAccountLogout,
  cilUserPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import userDefault from './../../assets/images/avatars/profile.png'
import { AuthContext } from '../../contexts/auth'

const AppHeaderDropdown = () => {
  
  const [avatar, setAvatar] = useState(userDefault);
  const {signed, user, logout} = useContext(AuthContext);

  const handleLogout = () => {
    logout()
  }

  useEffect(()=>{
    setAvatar(user?.photoURL ?? userDefault)
  },[user]);

  return (
    <CDropdown variant="nav-item">
      <div className='d-flex align-items-center'>
        <span><b>{user?.displayName}</b></span>
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {signed ? (
          <>
            <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
            <CDropdownItem href="#/profile">
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
            <CDropdownItem href="#/settings">
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
            {/* <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader> */}
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
