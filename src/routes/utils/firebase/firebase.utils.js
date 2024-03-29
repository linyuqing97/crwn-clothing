import {initializeApp} from 'firebase/app';
import {getAuth, 
        signInWithPopup,
        signInWithEmailAndPassword,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
}from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDW4yqplXO4vxFddLGN-3jXQNMwsChAoSM",
    authDomain: "crown-clothing-db-70c61.firebaseapp.com",
    projectId: "crown-clothing-db-70c61",
    storageBucket: "crown-clothing-db-70c61.appspot.com",
    messagingSenderId: "394661306839",
    appId: "1:394661306839:web:5ac62f00c782f55872ab92",
    measurementId: "G-3SPC12TMQ7"
  };

initializeApp(firebaseConfig);

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

export const signInAuthUserWithEmailAndPassword = async (email , password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {

    onAuthStateChanged(auth, callback )
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, filed) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log("done");
}

export const getCategoriesAndDocuments = async (collectionKey, objectsToGet, filed) => {
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc; 
    }, {});

    return categoryMap;
}