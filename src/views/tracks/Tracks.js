import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCardImage, CModal, CModalBody, CModalHeader, CModalTitle, CTable } from "@coreui/react";
import TracksService from "../../services/tracks/Tracks";
import classNames from "classnames";
import CIcon from "@coreui/icons-react";
import { cilColorBorder, cilPencil, cilTrash, cilZoom } from "@coreui/icons";
import Youtube from "../../services/youtube/Youtube";
import { toast } from "sonner";
import Spotify from "../../services/spotify/Spotify";

const Tracks = () => {

  const [tracks, setTracks] = useState([]);
  const [items, setItems ] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modal, setModal] = useState({});

  const handleTracks = async () => {
    await TracksService.getTracks()
    .then(querySnapshot=>{
      let list =[];
      let tableItems =[];

      querySnapshot?.forEach((doc) => {

        let data=doc.data();
        list.push(data);

        tableItems.push(
          {
            class: 'Default',
            name: data.name,
            sourceType: <><CBadge color={data.sourceType=='1'?"danger":"success"}>{data.sourceType==1?'Youtube':'Spotify'}</CBadge></>,
            artist: data.artists[0].name,
            actions: <>
                      <CButton color="light" size="sm" className="me-1" onClick={()=>viewTrack(data)}><CIcon icon={cilZoom}/></CButton>
                      {/* <CButton color="info" size="sm" className="me-1"><CIcon icon={cilPencil}/></CButton> */}
                      <CButton color="danger" size="sm" className="me-1"><CIcon icon={cilTrash}/></CButton>
                    </>,
            _cellProps: { class: { scope: 'row' } },
          }
        );
      });

      setTracks(list);
      setItems(tableItems);
    })
  }

  useEffect(()=>{
    handleTracks();
  },[]);

  const columns = [
    { key: 'name', _props: { scope: 'col' } },
    { key: 'sourceType', label: 'Type', _props: { scope: 'col' } },
    { key: 'artist', label: 'Artist/Channel', _props: { scope: 'col' } },
    { key: 'actions', label: 'Actions', _props: { scope: 'col' } },
  ];

  const viewTrack = (data) => {
    setModalIsOpen(!modalIsOpen);
    setModal({title: 'View track', track: data });
  }

  const handleUpdateViews = async (track) => {

    if(track.sourceType==1){
      await Youtube.getVideo(track.id)
      .then(async (res)=>{
          console.log('get video success', res);
          
          await TracksService.updateTrackViews({
            ...track,
            views: res?.items[0]?.statistics?.viewCount
          });
          
          toast.success('updated successfully');
      })
      .catch((error)=>{
          toast.error('An error occurred');
      })
      .finally(()=>setModalIsOpen(false));

    }
    else if(track.sourceType==2){

      await Spotify.getTrack(track.id)
      .then(async (res)=>{

        await TracksService.updateTrackViews({
          ...track,
          views: res.streamCount
        });

        toast.success('updated successfully');

      })
      .catch((error)=>{
        toast.error('An error occurred');
      })
      .finally(()=>setModalIsOpen(false));
    }
  }
  
  return (
    <div>
      <CCard>
        <CCardHeader>Tracks</CCardHeader>
        <CCardBody>
          <CTable 
            color="dark" 
            striped 
            hover 
            columns={columns} 
            items={items} 
            tableHeadProps={{ color: 'light' }} 
            className='rounded'
          />
        </CCardBody>
      </CCard>

      <CModal visible={modalIsOpen} onClose={()=>setModalIsOpen(false)} alignment="center">
        <CModalHeader>
          <CModalTitle>{modal?.title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <p>
              <b>Source: </b> <CBadge color={modal?.track?.sourceType=='1'?"danger":"success"}>{modal.track?.sourceType==1?'Youtube':'Spotify'}</CBadge>
            </p>
            <p>
              <b>Name: </b> {modal?.track?.name}
            </p>
            <p>
              <b>{modal?.sourceType=='1'?'Channel':'Artist'}: </b> {modal?.track?.artists?.map((a)=>a.name)?.join(', ')}
            </p>
            {modal?.track?.thumb?.[0]?.url && (
              <div>
                <CCard>
                  <CCardImage src={modal?.track.thumb[0]?.url} />
                </CCard>
              </div>
            )}
          </div>
          <div className="border-top mt-3 pt-3 text-start">
            <CButton color="light" className="px-4"onClick={()=>handleUpdateViews(modal.track)} >
              Update views
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default Tracks