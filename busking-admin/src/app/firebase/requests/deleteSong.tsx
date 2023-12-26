import {doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../config";

export default async function deleteSong(id: string) {
    await deleteDoc(doc(db, "requests", id));
}