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
  const { cadastro, loadingAuth, user } = useContext(AuthContext);
  let navigate = useNavigate();

  function register(e){
    console.log('aquir');
    e.preventDefault();
    if(data.username !== '' && data.email !=='' && data.password !== ''){
      console.log('aquir2', data);
      cadastro(data.username, data.email, data.password);
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={register}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                     placeholder="Username"
                     value={data.username} 
                     onChange={(e)=>setData({...data, username: e.target.value})}
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
                    <Link to="/login" color="white" 
                      className="mt-2 p-2 color-link border text-center text-decoration-none"
                      >Login</Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
            <div className='text-center mt-2'>
              <Link to="/" color="white" className="px-0 color-link text-decoration-none">
                <CIcon icon={cilHome} /> Ir para página principal
              </Link>              
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
