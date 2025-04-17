import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import db from "../connection";

export default class Tracks {

    static async getTracks(){
        try {

            const q = query(collection(db, 'tracks'));

            const querySnapshot = await getDocs(q);

            console.log('q',querySnapshot);
            return querySnapshot;
        } catch (error) {
            throw error;
        }
    }

    static async updateTrackViews(track) {
        try {
            let now = new Date();
            const docRef = doc(db, 'track-views', track.id);
            const key = now.valueOf();

            const updateTimestamp = await updateDoc(docRef, {
                [key]: {
                    id: track.id,
                    name: track.name,
                    views: track.views,
                    createdAt: now?.toISOString()
                }
            });
            
            return updateTimestamp;
        } catch (error) {
            throw error;
        }
    }
}