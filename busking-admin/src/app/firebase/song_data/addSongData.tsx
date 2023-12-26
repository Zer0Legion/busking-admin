// import { randomUUID } from "crypto";
import SongData from "../../interfaces/SongData"
import { addDoc, collection, doc, setDoc, FieldValue, serverTimestamp } from "firebase/firestore";
import { db } from "../config";

export default async function addSongData(data: SongData) {
  await setDoc(doc(db, "song_data", data.name.concat(data.artist)), data);
}



// export default async function addSongRequest(name: string, artist: string, remarks: string): Promise<any> {
//     console.log("addSongRequest");
//     let isBusking = true;
//     await getIsBusking().then(r => isBusking = r);

//     checkUniqueTitle(name, artist).then((r) => {
//         if (isBusking &&( r && name != "")) {
//             addDoc(collection(db, "requests"), {
//                 name: name,
//                 artist: artist,
//                 remarks: remarks,
//                 created: serverTimestamp()
//             });
//         }
//     })

// }