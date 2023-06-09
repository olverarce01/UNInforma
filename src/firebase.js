import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqlw5JLD9Sb5DsO-6t_lgnTwpGmIsVEdE",
  authDomain: "uninforma-79b66.firebaseapp.com",
  projectId: "uninforma-79b66",
  storageBucket: "uninforma-79b66.appspot.com",
  messagingSenderId: "488462702441",
  appId: "1:488462702441:web:1605ae9987bb99e8550ff8",
  measurementId: "G-RCHJ7QWNVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);

export const storage = getStorage(app);
export const auth=getAuth(app);
export default db;