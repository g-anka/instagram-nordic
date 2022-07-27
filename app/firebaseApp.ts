// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBp-7157WpXxGD5Qv1EHHyZCEZlXwnRKeA",
    authDomain: "instagram-nordic-anka.firebaseapp.com",
    projectId: "instagram-nordic-anka",
    storageBucket: "instagram-nordic-anka.appspot.com",
    messagingSenderId: "212837334570",
    appId: "1:212837334570:web:150ca5c536cb3073108d53",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)