import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCardImage, CCardText, CCardTitle, CCol, CFormInput, CFormLabel, CFormSelect, CRow, CSpinner } from "@coreui/react";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import imageDefault from "../../../assets/images/banner.png";
import Spotify from "../../../services/spotify/Spotify";

const CreateTracks = () => {
    const [searchField, setSearchField] = useState('');
    const [valid, setValid] = useState({source:true, search:true});
    const [searchActive, setSearchActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [tracks, setTracks] = useState([]);

    // const search = useCallback(
    //     debounce((e) => {
    //       setSearchField(e.target.value);
    //     }, 800)
    // ,[]);

    const handleSearchField = (e) => {
        let value = e.target.value;
        setSearchField(value);
        setValid({...valid, search: true})
    }

    const activateSearch = async ()=>{
        if(searchField.length){
            setSearchActive(true);
            setLoading(true);

            //check the source first
            await Spotify.searchTracks(searchField)
            .then((data)=>{
                
                let tracksList = [];
                
                data.data.searchV2.tracksV2.items?.map((track)=>{
                    let data = track.item.data;
                    let album = track.item.data.albumOfTrack;

                    if(track.item.data.playability.playable){
                        tracksList.push({
                            cover: album.coverArt.sources[0],
                            album: {
                                id: album.id,
                                name: album.name,
                                uri: album.uri,
                            },
                            artists: data.artists.items,
                            id: data.id,
                            name: data.name,
                            uri: data.uri
                        })
                    }

                })
                console.log('tracksList',tracksList);
                setTracks(tracksList);
            })
            .catch((error)=>{
                toast.error('An error occurred');
                setError(true);
            })
            .finally(()=>setLoading(false));


        }else{
            toast.warning('Inform the track name');
            setValid({...valid, search:false})
        }
    }

    const RenderTrackCard = ({track}) => {
        return (
            <CCard className="mb-3">
                <CRow className="g-0">
                    <CCol md={4} className="p-3">
                        <CCardImage src={track?.cover?.url ?? imageDefault} />
                    </CCol>
                    <CCol md={8}>
                        <CCardBody className="ps-0">
                            <CCardTitle className="text-truncate">{track?.name}</CCardTitle>
                            <CCardText className="text-truncate">
                                {track?.artists?.map((a)=>a.profile.name)?.join(', ')}
                            </CCardText>
                        </CCardBody>
                    </CCol>
                </CRow>
            </CCard>
        )
    }
  
    return (
        <div>
            <CCard>
                <CCardHeader>Create Track</CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol md={12}>
                            <CFormLabel>Source</CFormLabel>
                            <CFormSelect
                                options={[
                                    { label: 'Select the source...' },
                                    { label: 'Youtube', value: '1' },
                                    { label: 'Spotify', value: '2' },
                                ]}
                            />
                        </CCol>
                        <CCol md={12} className="mt-3">
                            <CFormLabel>Search track</CFormLabel>
                            <CRow>
                                <CCol md={10}>
                                    <CFormInput
                                        name='search'
                                        placeholder="Track name"
                                        onChange={(e)=>handleSearchField(e)} 
                                        invalid={!valid.search}
                                        feedback="Please provide a valid track name."
                                    />
                                </CCol>
                                <CCol md={2}>
                                    <CButton color="primary w-100" onClick={activateSearch}>Search</CButton>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            {searchActive && (
                <div>
                    {loading?(
                        <div className="d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                            <CSpinner />
                        </div>
                    ):(
                        <CCard className="mt-3">
                            <CCardBody>
                                <div className="text-center mb-3">
                                    <h4>Results</h4>
                                </div>
                                <CRow>
                                    {tracks?.map((track)=>(
                                        <CCol md={3}>
                                            <RenderTrackCard track={track}/>
                                        </CCol>
                                    ))}
                                </CRow>
                                {error && (
                                    <CAlert color='danger'>
                                        An error occurred
                                    </CAlert>
                                )}
                            </CCardBody>
                        </CCard>
                    )}
                </div>
            )}
        </div>
    )
  }
  
  export default CreateTracks