// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqvzUp7kwzZGD2IvzAxMR_DL7cPkACwyk",
    authDomain: "authentication-app-cee0d.firebaseapp.com",
    projectId: "authentication-app-cee0d",
    storageBucket: "authentication-app-cee0d.appspot.com",
    messagingSenderId: "132823698786",
    appId: "1:132823698786:web:a02e6fd481c8c8dbe3f03b",
    measurementId: "G-SY2ZGC1KK8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()
const auth = getAuth()

export default app
export { auth, db, storage }