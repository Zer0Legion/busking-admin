// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoTN3ryDG-v_oAitSk4y83yL-TW5ouo3E",
  authDomain: "busking-28de5.firebaseapp.com",
  projectId: "busking-28de5",
  storageBucket: "busking-28de5.appspot.com",
  messagingSenderId: "835139044132",
  appId: "1:835139044132:web:f6a08781f5ef931f9ba9b1",
  databaseURL: "https://busking-28de5-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
