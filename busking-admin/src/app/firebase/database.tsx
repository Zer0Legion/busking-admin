import {ref, get, getDatabase} from "firebase/database";

export const database = getDatabase();
export const dbRef = ref(getDatabase());