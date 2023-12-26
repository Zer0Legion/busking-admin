import { collection, getDocs, orderBy, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../config";

export default async function getSongData(name: string) {
    const requestsRef = collection(db, "song_data");
    const q = query(requestsRef, where("name", "==", name));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(r => {
        return r.data();
    })
}