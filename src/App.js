import logo from './logo.svg';
import './App.css';

import {useEffect,useState} from "react"
import { firebaseDB , dbRef, writeUserData} from "./Firebase.jsx"
// google Oauth
import { getAuth, getRedirectResult, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function App() {
  console.log(process.env.REACT_APP_PROJECT_ID)

const onclickHandler = () => {
  writeUserData()
  console.log("onclick executed")
}


//google Oauth

const [googleSignedUser, setGoogleSignedUser] = useState(null);

const googleSigninHandler =  async () => {
  const googleProvider =  new GoogleAuthProvider();
  const googleAuth = getAuth()




  // gives google access token. can use it to access the google API
  signInWithPopup(googleAuth, googleProvider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    //signed-in user info
    const user = result.user;
    setGoogleSignedUser(user)
   
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // email of the user's account used.
    const email = error.customDtat.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    
    console.log("google signin error", errorCode, errorMessage, email, credential)
  })
}

    



  return (
    <div className="App">
      <button onClick={onclickHandler}>TEST crud DATABASE</button>
      <div>welcome, {googleSignedUser}</div>
      <button onclick={googleSigninHandler}>Signin with Google</button>
    </div>
  );
}

export default App;
