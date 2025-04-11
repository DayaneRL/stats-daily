import { createSearchParams } from "../../utility/Utils";

const URL = import.meta.env.VITE_SPOTIFY_URL;

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
            
            let response = await fetch(`${URL}?${query}`,
                {
                    headers: {
                        authorization: `Bearer ${import.meta.env.VITE_SPOTIFY_KEY}`,
                        // 'client-token': import.meta.env.VITE_SPOTIFY_TOKEN,
                    }
                }
            );
            const data = await response.json()

            return data
        } catch (error) {
            throw error;
        }
    }

}