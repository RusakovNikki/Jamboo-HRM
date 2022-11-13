// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { useEffect, useState } from "react"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx6diEsZEg1-JVpRFQKZYjbLvEc6xXWHM",
    authDomain: "jamboo-hrm.firebaseapp.com",
    projectId: "jamboo-hrm",
    storageBucket: "jamboo-hrm.appspot.com",
    messagingSenderId: "879411737975",
    appId: "1:879411737975:web:819e738a32a89c26ef9d72",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
const storage = getStorage()

// Custom Hook

export function useAuth() {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub
    }, [])

    return currentUser
}

export async function uploadData(file, currentUser) {
    if (file) {
        const fileRef = ref(storage, `avatars/${currentUser.uid}.png`)

        // const snapshot = 
        await uploadBytes(fileRef, file)
    }
}

export function useGetDataAboutUser(currentUser) {
    const [role, setRole] = useState(null)
    if (currentUser) {
        const docRef = doc(db, "aboutUser", currentUser?.uid)
        getDoc(docRef).then(result => {
            setRole(result.data()?.role)
        }, req => {
            console.log(req)
        })
    }
    return role
}