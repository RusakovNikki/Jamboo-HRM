// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx6diEsZEg1-JVpRFQKZYjbLvEc6xXWHM",
    authDomain: "jamboo-hrm.firebaseapp.com",
    projectId: "jamboo-hrm",
    storageBucket: "jamboo-hrm.appspot.com",
    messagingSenderId: "879411737975",
    appId: "1:879411737975:web:819e738a32a89c26ef9d72"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)