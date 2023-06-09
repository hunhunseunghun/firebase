// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore/lite"
import {getDatabase, ref, child, get, set} from "firebase/database"
import {getAuth, GoogleAuthProvider} from "firebase/auth"


import "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL
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
    age : "23",
    sex : "female",
  }
  });
}

// firebase 로그인 여부 확인



// google Oauth ----------------------------------------------------------------
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}



