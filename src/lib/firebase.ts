import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyB4IqX2Hd_tdLv2_qes_TdKvWczlqMvqNQ",
  authDomain: "keshwala-mvp.firebaseapp.com",
  projectId: "keshwala-mvp",
  storageBucket: "keshwala-mvp.firebasestorage.app",
  messagingSenderId: "84416955059",
  appId: "1:84416955059:web:db71f5972624a46113e6c6",
  measurementId: "G-500BJCEZFF"
}


// Initialize Firebase (avoid duplicate initialization)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services (client-side only)
let auth: any = null
let db: any = null
let storage: any = null
let analytics: any = null

if (typeof window !== 'undefined') {
  try {
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
    analytics = getAnalytics(app)
  } catch (error) {
    console.error('Firebase initialization error:', error)
  }
}

export { auth, db, storage, analytics }

export default app

