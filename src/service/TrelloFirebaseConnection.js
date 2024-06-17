import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore, doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";


export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const querySnapshot = await getDocs(collection(db, "trello"));



//add obj in an array
export async function addItem(db, mainCollection, document, key, convertedObj) {
    await updateDoc(doc(db, mainCollection, document), {
        [key]: arrayUnion(convertedObj)
    });
}


//delete array from an array
export async function deleteItem(db, mainCollection, document, key, convertedObj) {
    await updateDoc(doc(db, mainCollection, document), {
        [key]: arrayRemove(convertedObj)
    });
}




