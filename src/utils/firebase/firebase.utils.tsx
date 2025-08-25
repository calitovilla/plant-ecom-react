// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { 
    getAuth, 
    //signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    type User
} from "firebase/auth";


import {    
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
//export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    // If user data does not exist, create it
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
                // Spread the additional information into the setDoc, 
                // if additionalInformation contains any fields like displayName, email, etc. it will overwrite them and
                // If the user document already exists, the fields will be updated with the new values
            });
        } catch (error) {
            console.error("Error creating the user document", error);
        }
    }

    return userDocRef;
}
      
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        if ((error as { code: string }).code === 'auth/email-already-in-use') {
            alert("Cannot create user, email already in use");
        }
        else {
            console.error("Error creating user with email and password", error);
        }
    }
}