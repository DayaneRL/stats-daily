import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHome, cilLockLocked, cilUser } from '@coreui/icons'
import { AuthContext } from '../../../contexts/auth'
import { toast } from 'sonner'

const Login = () => {

  const [data, setData] = useState({});
  const {login, resetPassword, signed} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  async function handleLogin(e){
    e.preventDefault();
    if(data.email && data.password){
      await login(data.email, data.password);
    }else{
      toast.warning('Please insert email and password')
    }
  }

  async function forgotPassword(){
    if(resetEmail?.length){
      resetPassword(resetEmail)
      setIsOpenModal(false);
    }else{
      toast.warning('Please inform the email');
    }
  }

  useEffect(()=>{
    if(signed){
      navigate('/dashboard');
    }
  },[signed])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <div className="row justify-content-md-center">
          <CCol  md="auto" className='justify-content-center'>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="email" autoComplete="email" 
                     onChange={(e)=>setData({...data, email: e.target.value})}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      onChange={(e)=>setData({...data, password: e.target.value})}
                      />
                    </CInputGroup>
                    <CRow className='text-center'>
                      <CCol xs={12}>
                        <CButton color="primary" className="px-4 w-100" type='submit'>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={12} className='mt-2'>
                        <Link to="/register">
                          <CButton color="white" className='w-100 border'>
                            Register
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol xs={12} className='mt-3'>
                        <CButton color="link" className="p-0" onClick={()=>setIsOpenModal(true)}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
            <div className='text-center mt-2'>
              <Link to="/" color="white" className="px-0 color-link text-decoration-none">
                <CIcon icon={cilHome} /> Home page
              </Link>              
            </div>
          </CCol>
        </div>
      </CContainer>

      <CModal visible={isOpenModal} onClose={() => setIsOpenModal(false)} alignment="center">
        <CModalHeader>
          <CModalTitle>Reset Password</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <p className="text-body-secondary">Please, inform the email to receive a reset link</p>
            <CCol md={12}>
              <CFormInput placeholder="email" autoComplete="email" 
              onChange={(e)=>setResetEmail(e.target.value)}/>
            </CCol>
            <div className="d-grid mt-3">
              <CButton color="primary" className="px-4 w-100" onClick={forgotPassword}>
                Reset
              </CButton>
            </div>
          </CRow>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default Login
