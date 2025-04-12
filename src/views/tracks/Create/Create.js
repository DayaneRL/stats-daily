import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCardImage, CCardText, CCardTitle, CCol, CFormInput, CFormLabel, CFormSelect, CRow, CSpinner, CTooltip } from "@coreui/react";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import imageDefault from "../../../assets/images/banner.png";
import Spotify from "../../../services/spotify/Spotify";
import Youtube from "../../../services/youtube/Youtube";
import { fixTextUtf8 } from "../../../utility/Utils";

const CreateTracks = () => {
    const [source, setSource] = useState('');
    const [valid, setValid] = useState({source:true, search:true});
    const [searchField, setSearchField] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [tracks, setTracks] = useState([]);

    const [paginate, setPaginate] = useState({next: '', previous: '', offset: 0});

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

    const activateSearch = async (filters)=>{
        if(source.length){
            setValid({...valid, source:true});

            if(searchField.length){
                setSearchActive(true);
                setLoading(true);

                if(source=='1'){
                    await Youtube.search(searchField, filters)
                    .then((data)=>{
                        console.log('data',data);
                        let tracksList = [];
                        data.items?.map((item)=>{
                            if(item.id?.kind=="youtube#video"){
                                let name = fixTextUtf8(item.snippet.title);
                                
                                tracksList.push({
                                    cover: item.snippet.thumbnails?.medium,
                                    artists: [{
                                        id: item.snippet.channelId,
                                        name: item.snippet.channelTitle,
                                    }],
                                    id: item.id,
                                    name: name,
                                    uri: ""
                                });
                            }
                        });
                        console.log('tracksList',tracksList);
                        setTracks(tracksList);

                        setPaginate({
                            ...paginate,
                            next: data?.nextPageToken, 
                            previous: data?.prevPageToken
                        })
                    })
                    .catch((error)=>{
                        toast.error('An error occurred');
                        setError(true);
                    })
                    .finally(()=>setLoading(false));
                }

                if(source=='2'){
                    await Spotify.search(searchField, filters)
                    .then((data)=>{
                        console.log('data',data);
                        let tracksList = [];
                        
                        data?.tracks?.items?.map((track)=>{
                            if(track.is_playable){
                                tracksList.push({
                                    cover: track.album.images[0],
                                    artists: track.artists,
                                    id: track.id,
                                    name: track.name,
                                    uri: track.uri
                                })
                            }

                        })
                        console.log('tracksList',tracksList);
                        setTracks(tracksList);
                        
                        let offset = filters?.offset >=0 ? filters?.offset: 0;//filters offset based on limit
                        setPaginate({
                            offset: offset,
                            next: offset+12,
                            previous:offset-12
                        });
                    })
                    .catch((error)=>{
                        toast.error('An error occurred');
                        setError(true);
                    })
                    .finally(()=>setLoading(false));

                }
            }else{
                toast.warning('Inform the track name');
                setValid({...valid, search:false})
            }   
        }else{
            toast.warning('Inform the source');
            setValid({...valid, source:false})
        }   
    }

    const RenderTrackCard = ({track}) => {
        return (
            <CTooltip content={track?.name}>
                <CCard className="mb-3 card-track">
                    <CRow className="g-0">
                        <CCol md={4} className="p-3">
                            <CCardImage src={track?.cover?.url ?? imageDefault} />
                        </CCol>
                        <CCol md={8}>
                            <CCardBody className="ps-0">
                                <h5 className="text-truncate text-card-title">{track?.name}</h5>
                                <CCardText className="text-truncate">
                                    {track?.artists?.map((a)=>a.name)?.join(', ')}
                                </CCardText>
                            </CCardBody>
                        </CCol>
                    </CRow>
                </CCard>
            </CTooltip>
        )
    }

    const RenderPaginateButtons = () => {
        return(
            <>
                {source=='1'?
                (
                    <CCol md={12} className="d-flex justify-content-between">
                        <CButton
                            disabled={!paginate.previous}
                            color="white border" 
                            variant='outline' 
                            onClick={()=>activateSearch({pageToken: paginate.previous})}
                            >Previous</CButton>
                        <CButton 
                            color="primary" 
                            variant='outline'
                            onClick={()=>activateSearch({pageToken: paginate.next})}
                            >Next</CButton>
                    </CCol>
                ):(
                    <CCol md={12} className="d-flex justify-content-between">
                        <CButton color="white border" variant='outline' 
                            disabled={paginate.offset==0}
                            onClick={()=>activateSearch({offset: paginate.previous})}
                            >Previous</CButton>
                        <CButton color="primary" variant='outline'
                            onClick={()=>activateSearch({offset: paginate.next})}
                            >Next</CButton>
                    </CCol>
                )}
            </>
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
                                invalid={!valid.source}
                                options={[
                                    { label: 'Select the source...' },
                                    { label: 'Youtube', value: '1' },
                                    { label: 'Spotify', value: '2' },
                                ]}
                                onChange={(e)=>setSource(e.target.value)}
                            />
                        </CCol>
                        <CCol md={12} className="mt-3">
                            <CFormLabel>Track name</CFormLabel>
                            <CRow>
                                <CCol md={10}>
                                    <CFormInput
                                        name='search'
                                        placeholder="Search name..."
                                        onChange={(e)=>handleSearchField(e)} 
                                        invalid={!valid.search}
                                        feedback="Please provide a valid track name."
                                    />
                                </CCol>
                                <CCol md={2}>
                                    <CButton color="primary w-100" onClick={()=>activateSearch()}>Search</CButton>
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
                        <CCard className="my-3">
                            <CCardBody>
                                <div className="text-center mb-3">
                                    <h4>Results</h4>
                                </div>
                                {error ? (
                                    <CAlert color='danger'>
                                        Coult not fetch data
                                    </CAlert>
                                ) :(
                                    <CRow>
                                        {tracks?.map((track)=>(
                                            <CCol md={4} key={track.id}>
                                                <RenderTrackCard track={track}/>
                                            </CCol>
                                        ))}
                                        <RenderPaginateButtons />
                                    </CRow>
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