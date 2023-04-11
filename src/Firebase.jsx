// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore/lite"
import {getDatabase, ref, child, get, set} from "firebase/database"

import "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig1 = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL
};

export const firebaseConfig = {
  apiKey: "AIzaSyBQweY5lzDrVgU2EseAfKdaKhT-wSvFmAI",
  authDomain: "morg-btob-mvp.firebaseapp.com",
  databaseURL: "https://morg-btob-mvp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "morg-btob-mvp",
  storageBucket: "morg-btob-mvp.appspot.com",
  messagingSenderId: "682511297304",
  appId: "1:682511297304:web:ad9e3a41b067d37ae5cc6d",
  measurementId: "G-0J289B8EW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize realtime database and get a reference to the service

export const firebaseDB = getDatabase(app)

export const dbRef = ref(getDatabase())
get(child(dbRef, "users")).then(snapshot => {
  if(snapshot.exists()){
    console.log(snapshot.val())
  } else {
    console.log("no user")
  }
}).catch(err => console.log(err))

export const  writeUserData = (userId, name, email, imageUrl) => {
  console.log("wirte user excuted")
  const db = getDatabase();
  set(ref(db, 'users/'), {
  morg : {
    age : "443",
    sex : "553",
  }
  });
}



