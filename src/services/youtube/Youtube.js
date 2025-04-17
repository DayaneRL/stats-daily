import { doc, setDoc } from "firebase/firestore";
import { createSearchParams } from "../../utility/Utils";
import db from "../connection";

const URL = import.meta.env.VITE_YOUTUBE_URL;
const KEY = import.meta.env.VITE_google_key;

export default class Youtube {

    static async search(searchTerm, filters=null) {
        try {
            let query = createSearchParams({
                part: 'snippet',
                maxResults: 12,
                q: searchTerm,
                type: 'video',
                order: 'relevance',
                regionCode: 'US',
                videoCategoryId: '10',
                key: KEY,
                ...filters
            });

            let response = await fetch(`${URL}/v3/search?${query}`);
            const data = await response.json();

            return data;
        } catch (error) {
            throw error;
        }
    }
    
    static async getVideo(id) {
        try {
            let query = createSearchParams({
                part: 'snippet,statistics',
                id: id,
                key: KEY
            });

            let response = await fetch(`${URL}/v3/videos?${query}`);
            const data = await response.json();

            return data;
        } catch (error) {
            throw error;
        }
    }

    static async PostTrack(track) {
        try {
            let now = new Date();
            const docRef = await setDoc(doc(db, `tracks/${track?.id}`), {
                ...track,
                sourceType: 1,
                createdAt: now?.toISOString()
            });

            return docRef;
        } catch (error) {
            throw error;
        }
    }
  
    static async PostTrackViews(track, statistics) {
        try {
            let now = new Date();
            const key = now.valueOf();

            const docRef = await setDoc(doc(db, `track-views/${track?.id}`), {
                [key]: {
                    id: track.id,
                    name: track.name,
                    views: statistics.viewCount,
                    createdAt: now?.toISOString()
                }
            });

            return docRef;
        } catch (error) {
            throw error;
        }
    }

}