// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
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
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsub
    }, [])

    return [currentUser, loading]
}

export async function uploadData(file, currentUser) {
    if (file) {
        const fileRef = ref(storage, `avatars/${currentUser.uid}.png`)

        const upload = await uploadBytes(fileRef, file)
        // const photo = await getDownloadURL(fileRef)

        await updateProfile(auth.currentUser, {
            photoURL: `https://firebasestorage.googleapis.com/v0/b/jamboo-hrm.appspot.com/o/avatars%2F${auth.currentUser.uid}.png?alt=media&token=4c17c0fd-9ba2-4a3b-bf13-2d4c1191793d`,
        }).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        });
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