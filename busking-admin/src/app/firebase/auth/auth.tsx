import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../config";

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const signIn = async () => {
    const user = await signInWithPopup(auth, provider);
    if (user.user.email == "lengkhai@gmail.com") {
        return user;
    }
    return null;
};

async function persist() {
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithPopup(auth, provider);
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
}

export const signOut = async () => {
    auth.signOut();
};