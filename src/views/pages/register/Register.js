import React, { useContext, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHome, cilLockLocked, cilUser } from '@coreui/icons'
import { AuthContext } from '../../../contexts/auth'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [data, setData] = useState({});
  const { register } = useContext(AuthContext);

  function registerUser(e){
    e.preventDefault();
    if(data.name !== '' && data.email !=='' && data.password !== ''){
      register(data.name, data.email, data.password);
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={registerUser}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                     placeholder="Name"
                     value={data.name} 
                     onChange={(e)=>setData({...data, name: e.target.value})}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" 
                      value={data.email} 
                      onChange={(e)=>setData({...data, email: e.target.value})}
                     />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={data.password} 
                      onChange={(e)=>setData({...data, password: e.target.value})}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={data.confirm} 
                      onChange={(e)=>setData({...data, confirm: e.target.value})}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type='submit'>Create Account</CButton>
                    <Link to="/login" >
                      <CButton color="white" 
                        className="mt-2 p-2 color-link border w-100"
                        >Login
                      </CButton>
                    </Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
            <div className='text-center mt-2'>
              <Link to="/" color="white" className="px-0 color-link text-decoration-none">
                <CIcon icon={cilHome} /> Home page
              </Link>              
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
