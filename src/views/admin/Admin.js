import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import DefaultProtectedLayout from "../../components/DefaultProtectedLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Admin = () => {
    const [data, setData] = useState({access_token: '', refresh_token:''});

    const saveSubmit = () => {
        localStorage.setItem('stats_spotify', JSON.stringify(data));
        toast.success('Tokens storaged succesfully');
    }

    useEffect(()=>{
        let data = localStorage.getItem('stats_spt');
        if(data?.access_token){
            setData(data);
        }
    },[]);

    return (
        <DefaultProtectedLayout>
            <div>
                <CCard>
                    <CCardHeader>Admin</CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs={12}>
                                <CCardText className="mb-0 fw-bold">Spotify keys</CCardText>
                                <small className="text-muted">Keep data on localStorage</small>
                            </CCol>
                            <CCol md={12} className="mt-3">
                                <CFormLabel>Access Token</CFormLabel>
                                <CFormInput
                                    placeholder="Access Token"
                                    onChange={(e)=>setData({...data, access_token: e.target.value})} 
                                />
                            </CCol>
                            <CCol md={12} className="mt-3">
                                <CFormLabel>Refresh Token</CFormLabel>
                                <CRow>
                                    <CCol md={12}>
                                        <CFormInput
                                            placeholder="Refresh Token"
                                            onChange={(e)=>setData({...data, refresh_token: e.target.value})} 
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol md={12} className="mt-3">
                                <CButton color="primary w-100" onClick={saveSubmit}>Save</CButton>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </div>
        </DefaultProtectedLayout>
    )
}

export default Admin;