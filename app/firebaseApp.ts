// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDbwJXPmeE3efiAz2HuyNE7wGypTdPhc68',
    authDomain: 'nordic-instagram-2022.firebaseapp.com',
    projectId: 'nordic-instagram-2022',
    storageBucket: 'nordic-instagram-2022.appspot.com',
    messagingSenderId: '34049376849',
    appId: '1:34049376849:web:aecf5e90503df391092e70',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)