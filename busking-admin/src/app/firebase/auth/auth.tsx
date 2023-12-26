import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../../config";
import { getDatabase, ref, onValue, get, child } from "firebase/database";

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);


// Unused. Meant to check if user.uid is an admin uid.
// export async function isAdmin(uid: string) {
//     const dbRef = ref(getDatabase());
//     // const res = get(child(dbRef, uid)).then(s => console.log(s.exportVal()));
//     // AuqqceW9FZgy755GRWKVnQKLK002
//     return (await get(child(dbRef, uid))).exportVal() != null;
// }


export const signIn = async () => {
    const user = await signInWithPopup(auth, provider);
    if (user.user.email != null) {
        console.log(user);
        return user;
    }
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