import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import db from "../../../services/connection";
import { CAlert, CAvatar, CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CPopover, CRow, CTooltip } from "@coreui/react";
import userDefault from './../../../assets/images/avatars/profile.png'
import { AuthContext } from "../../../contexts/auth";
import RenderImages from "./components/RenderImages";
import CIcon from "@coreui/icons-react";
import { cilWarning } from "@coreui/icons";

const Profile = () => {
    const [avatar, setAvatar] = useState(userDefault);
    const [image, setImage] = useState();
    const [openPopover, setOpenPopover] = useState(false);
    const togglePopover = () => setOpenPopover(!openPopover);

    const {user, updateUser, uploadUserPhoto, verifyEmail} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);

    useEffect(()=>{
        setUserData(user);
        if(user?.photoURL){
            setAvatar(user.photoURL)
        }
    },[]);

    const onChange = (e) => {
        const reader = new FileReader(),
        files = e.target.files;
        reader.onload = function () {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(files[0]);
        setImage(files[0]);
    }

    const updateProfile = () => {
        updateUser(userData.displayName, userData.photoURL);
        if(image){
            uploadUserPhoto(image);
        }
    }

    const changeImageLocal = (image) => {
        togglePopover();
        setAvatar(image);
        setUserData({...userData, photoURL: image});
    }

    const sendVerification = () => {
        verifyEmail();
    }

    return (
        <div>
        <CCard>
            <CCardHeader>Profile</CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol md={12}>
                        <div className="d-flex align-items-center justify-content-center">
                            <CAvatar src={avatar} size="xl" />
                            <div className="d-flex flex-column ms-2">
                                <CFormLabel>Profile image</CFormLabel>
                                <div>
                                    <CButton as={CFormLabel} size="sm" color="secondary m-0">
                                        Choose file
                                        <CFormInput type='file' onChange={onChange} hidden accept='image/*' />
                                    </CButton>
                                    <CPopover
                                        content={<RenderImages selectAvatar={changeImageLocal}/>}
                                        placement="bottom"
                                        visible={openPopover}
                                    >
                                        <CButton color="primary ms-2" size="sm" onClickCapture={togglePopover}>
                                            Change image
                                        </CButton>
                                    </CPopover>
                                </div>

                            </div>
                        </div>
                    </CCol>
                    <CCol md={6} className="mt-3">
                        <CFormLabel>Name</CFormLabel>
                        <CFormInput
                            placeholder="Name"
                            value={userData.displayName} 
                            onChange={(e)=>setUserData({...userData, displayName: e.target.value})}
                        />
                    </CCol>
                    <CCol md={6} className="mt-3">
                        <CFormLabel>
                            E-mail
                            {!userData?.emailVerified && (
                                <CTooltip content="verify your account">
                                    <CIcon icon={cilWarning} className="ms-2 text-warning"/>
                                </CTooltip>
                            )}
                        </CFormLabel>
                        <CFormInput placeholder="Email" 
                            disabled 
                            readOnly 
                            value={userData.email}
                            onChange={(e)=>setUserData({...userData, email: e.target.value})}
                        />
                    </CCol>
                </CRow>
                {!userData?.emailVerified && (
                    <div className="mt-3">
                        <CAlert color="warning py-2">
                            You didn't verified your account yet! Please {' '}
                            <span className="text-primary text-decoration-underline" onClick={sendVerification} style={{cursor:'pointer'}}>
                                click here
                            </span>
                            {' '}to verify.
                        </CAlert>
                    </div>
                )}
                <div className="text-end mt-3">
                    <CButton color="primary" onClick={updateProfile}>Save</CButton>
                </div>
            </CCardBody>
        </CCard>
        </div>
    )
}

export default Profile