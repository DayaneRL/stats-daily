import { CButton, CCard, CCardBody, CCardHeader, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth";
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";
import { toast } from "sonner";

const Settings = () => {

    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [emailDisabled, setEmailDisabled] = useState(true);
    const [modal, setModal] = useState(false);
    const [editPassword, setEditPassword] = useState({status: false, password:'', confirmPassword:''});
    const toggleEditPassword = () => setEditPassword({...editPassword, status: !editPassword.status})

    useEffect(()=>{
        setUserData(user);
    },[]);

    const changeEmail = () => {
        if(userData.email !== user.email){
            setModal(true);
            //updateEmail
        }else{
            toast.warning("No email changes detected.");
        }
    }

    const confirmChangeEmail = () => {
        setModal(!modal);
    }

    const confirmChangePassword = () => {
        if(!editPassword.password?.length){
            toast.warning('Password is required');
        }
        else if(editPassword.password == editPassword.confirmPassword){
            //changeUserPassword
        }else{
            toast.warning("Password confirmation doesn't match the password");
        }
    }

    return ( 
        <div>
            <CCard>
                <CCardHeader>E-mail</CCardHeader>
                <CCardBody>
                    <small>
                        This email is used for login and account-related notifications.
                    </small>
                    <div className="mt-2">
                        <CFormLabel>
                            <b>E-mail</b>
                        </CFormLabel>
                        <CInputGroup className="mb-3">
                            <CFormInput placeholder="Email"
                                disabled={emailDisabled}
                                value={userData.email}
                                onChange={(e)=>setUserData({...userData, email: e.target.value})}
                            />
                            <CInputGroupText>
                                <CButton size="sm" onClick={()=>setEmailDisabled(false)}>
                                    <CIcon icon={cilPen} />
                                </CButton>
                            </CInputGroupText>
                        </CInputGroup>
                    </div>
                    {!emailDisabled && (
                        <div className="mt-3 text-end">
                            <CButton color="white border me-1" onClick={()=>{
                                setEmailDisabled(true)
                                setUserData({...userData, email: user.email})
                            }}>Cancel</CButton>
                            <CButton color="primary" onClick={changeEmail}>Confirm change</CButton>
                        </div>
                    )}
                </CCardBody>
            </CCard>
            <CCard className="mt-4">
                <CCardHeader>Password</CCardHeader>
                <CCardBody>
                    <div className="d-flex align-items-center justify-content-between">
                        <small>This password is used for login.</small>
                        <CButton color="danger" variant="outline" onClick={toggleEditPassword} disabled={editPassword.status}>
                            Change password
                        </CButton>
                    </div>
                    {editPassword.status && (
                        <div className="mt-2">
                            <div className="mb-1">
                                <CFormLabel>New password</CFormLabel>
                                <CFormInput type="password" onChange={(e)=>setEditPassword({...editPassword, password: e.target.value})}/>
                            </div>
                            <div>
                                <CFormLabel>Confirm new password</CFormLabel>
                                <CFormInput type="password" onChange={(e)=>setEditPassword({...editPassword, confirmPassword: e.target.value})}/>
                            </div>
                            <div className="mt-3 text-end">
                                <CButton color="white border me-1" onClick={
                                    ()=>setEmailDisabled({status: false, password:'', confirmPassword:''})
                                }>Cancel</CButton>
                                <CButton color="primary" onClick={confirmChangePassword}>Confirm</CButton>
                            </div>
                        </div>
                    )}
                </CCardBody>
            </CCard>

            <CModal visible={modal} onClose={() => setModal(false)} alignment="center">
                <CModalHeader onToggle={() => setModal(false)}>
                    <CModalTitle>Confirm changes</CModalTitle>
                </CModalHeader>
                <CModalBody>
                   Do you really want to change you e-mail to <b>{userData.email}</b>?
                   <br/>
                   This action will <i>logout your account</i> and send a confirmation 
                   link to the new email, please make sure to complete the action.

                   <small className="mt-3"></small>
                </CModalBody>
                <CModalFooter>
                    <CButton color="white border" onClick={()=>setModal(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={confirmChangeEmail}>Confirm</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default Settings;