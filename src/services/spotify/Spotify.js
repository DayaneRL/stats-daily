import { doc, setDoc } from "firebase/firestore";
import { createSearchParams, getStoragedData } from "../../utility/Utils";
import db from "../connection";

const PARTNER_URL = import.meta.env.VITE_SPOTIFY_PARTNER_URL;
const URL = import.meta.env.VITE_SPOTIFY_URL;
// const ACCESS_TOKEN = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN;
const RAPIDAPI_KEY = import.meta.env.VITE_SPOTIFY_RAPIDAPI_KEY;

export default class Spotify {

    static async searchTracks(searchTerm) {
        try {
            let query = createSearchParams({
                operationName: 'searchTracks',
                variables: JSON.stringify({
                    "includePreReleases":false,
                    "numberOfTopResults":20,
                    "searchTerm":searchTerm,
                    "offset":0,
                    "limit":20,
                    "includeAudiobooks":true,
                    "includeAuthors":false,
                    "locale": "intl-en"
                }),
                extensions: JSON.stringify({
                    "persistedQuery":{
                        "version":1,
                        "sha256Hash":"bc1ca2fcd0ba1013a0fc88e6cc4f190af501851e3dafd3e1ef85840297694428"
                    }
                })
            });
            
            let response = await fetch(`${PARTNER_URL}?${query}`,
                {
                    headers: {
                        authorization: `Bearer ${import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN}`,
                    }
                }
            );
            const data = await response.json()

            return data
        } catch (error) {
            throw error;
        }
    }

    static async search(term, filters=null, tryAgain=true) {
        try {
            let data_storage = getStoragedData('stats_spotify');
            
            console.log('search', term, filters, data_storage.access_token)

            let query = createSearchParams({
                q: term,
                type: 'track',
                limit: 12,
                ...filters
            });
            
            let response = await fetch(`${URL}/v1/search?${query}`,
                {
                    headers: {
                        authorization: `Bearer ${data_storage.access_token}`,
                    }
                }
            );

            if(response.status==200){
                const data = await response?.json()
                return data;
            }

            return response;

        } catch (error) {
            throw error;
        }
    }

    static async refresh_token() {
        try{
            const data_storage = getStoragedData('stats_spotify');

            let response = await fetch('https://accounts.spotify.com/api/token',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${import.meta.env.VITE_SPOTIFY_BASE64}`
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: data_storage?.refresh_token,
                    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID
                }),
            });
            let data = await response?.json();

            if(response.status==200){
                localStorage.setItem('stats_spotify', JSON.stringify({
                    access_token: data.access_token,
                    refresh_token: data?.refresh_token ?? data_storage?.refresh_token
                }));
            }

            return {...data, status: response.status};
        } catch (error) {
            throw error;
        }
    }

    static async getTrack(trackId) {
        try {

            let response = await fetch(`https://spotify-statistics-and-stream-count.p.rapidapi.com/track/${trackId}`,
                {
                    headers: {
                        'x-rapidapi-host': 'spotify-statistics-and-stream-count.p.rapidapi.com',
                        'x-rapidapi-key': RAPIDAPI_KEY
                    }
                }
            );
            
            return response.json();
        } catch (error) {
            throw error;
        }
    }

    static async createTrack(track) {
        try {
            let now = new Date();
            const docRef = await setDoc(doc(db, `tracks/${track?.id}`), {
                ...track,
                sourceType: 2,
                createdAt: now?.toISOString()
            });

            return docRef;
        } catch (error) {
            throw error;
        }
    }
    
    static async createTrackViews(track) {
        try {
            let now = new Date();
            const key = now.valueOf();

            const docRef = await setDoc(doc(db, `track-views/${track?.id}`), {
                [key]: {
                    id: track.id,
                    name: track.name,
                    views: track.streamCount,
                    createdAt: now?.toISOString()
                }
            });

            return docRef;
        } catch (error) {
            throw error;
        }
    }
}