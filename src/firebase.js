import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDP_BifKvv5G5FLMGShstS9usm1Rqufh0g",
  authDomain: "emergencyapp-348118.firebaseapp.com",
  projectId: "emergencyapp-348118",
  storageBucket: "emergencyapp-348118.appspot.com",
  messagingSenderId: "287565067774",
  appId: "1:287565067774:web:95411aaf4a7b66d0693caf",
  measurementId: "G-LGZ0M81M2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);

export const storage = getStorage(app);
export const auth=getAuth(app);
export default db;