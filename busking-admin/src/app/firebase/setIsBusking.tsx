import { db } from "./config";
import { doc, setDoc } from "firebase/firestore"; 

export default async function setIsBusking(isBusking: boolean) {
    await setDoc(doc(db, "busking_status", "status"), {
        isBusking: isBusking
    })
}