import { createSearchParams } from "../../utility/Utils";

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


}