// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3w-e-HcfYVoxHiDEkev3_4q8hKRrmRzo",
  authDomain: "ecommercenextjs-88f1e.firebaseapp.com",
  projectId: "ecommercenextjs-88f1e",
  storageBucket: "ecommercenextjs-88f1e.appspot.com",
  messagingSenderId: "105183096241",
  appId: "1:105183096241:web:fa79f3062c8dbc6a622190"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    app, db
}