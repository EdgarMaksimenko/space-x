import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const firebaseApp = initializeApp(
  {
    apiKey: "AIzaSyAuNdubkN0N5MBhZEMQ2G1FyreCNl4seXI",
    authDomain: "space-x-users.firebaseapp.com",
    projectId: "space-x-users",
    storageBucket: "space-x-users.appspot.com",
    messagingSenderId: "783425036193",
    appId: "1:783425036193:web:435f14d6c88b1bbb3275e0",
    measurementId: "G-176H7LV12K"
  }
);

export const db = getFirestore(firebaseApp);
export const auth = getAuth();


