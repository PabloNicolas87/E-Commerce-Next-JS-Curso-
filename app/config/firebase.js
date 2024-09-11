import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC3w-e-HcfYVoxHiDEkev3_4q8hKRrmRzo",
  authDomain: "ecommercenextjs-88f1e.firebaseapp.com",
  projectId: "ecommercenextjs-88f1e",
  storageBucket: "ecommercenextjs-88f1e.appspot.com",
  messagingSenderId: "105183096241",
  appId: "1:105183096241:web:fa79f3062c8dbc6a622190"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export {
    app, db, storage, auth, provider
}