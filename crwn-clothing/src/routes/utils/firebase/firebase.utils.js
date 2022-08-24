import {initializeApp} from 'firebase/app';
import {getAuth, 
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc}from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDW4yqplXO4vxFddLGN-3jXQNMwsChAoSM",
    authDomain: "crown-clothing-db-70c61.firebaseapp.com",
    projectId: "crown-clothing-db-70c61",
    storageBucket: "crown-clothing-db-70c61.appspot.com",
    messagingSenderId: "394661306839",
    appId: "1:394661306839:web:5ac62f00c782f55872ab92",
    measurementId: "G-3SPC12TMQ7"
  };

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, 
    additionalInformation = {}
    )=>{
    if(!userAuth)return;
    const userDocRef = doc(db, 'users', userAuth.uid); 
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
    }
    
    return userDocRef;
    
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}