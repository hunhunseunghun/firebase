import logo from './logo.svg';
import './App.css';

import {useEffect,useState} from "react"
import { auth, firebaseDB , dbRef, writeUserData} from "./Firebase.jsx"
// google Oauth
import { getAuth, signOut, getRedirectResult, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function App() {
  console.log(process.env.REACT_APP_PROJECT_ID)

const onclickHandler = () => {
  writeUserData()
  console.log("onclick executed")
}

const [googleSigninUser, setGoogleSigninUser] = useState("")
const [googleSigninUserImage, setGoogleSinginUserImage] = useState("")

const googleSigninHandler = () => {
  console.log("googleSigninHandler executed")
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    setGoogleSigninUser(user.displayName)
    setGoogleSinginUserImage(user.photoURL)
    console.log("googleSigninHandler success", user)
    console.log(googleSigninUserImage)
   
  }).catch((error) => {
    console.log("googleSigninHandler error", error)
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  })
}

//google Oauth sign out

const googleSignOutHandler = () => {
  const auth = getAuth()
  signOut(auth).then(() => {
    console.log("google sign out success")
    setGoogleSigninUser("")
    setGoogleSinginUserImage("")
  }).catch((error) => {
    console.log("google sign out error", error)
  })

}





    



  return (
    <div className="App">
      <button onClick={onclickHandler}>TEST crud DATABASE</button>
      <div>
      <img src={googleSigninUserImage} />
      <div>welcome, {googleSigninUser}</div>
      </div>
      <button onClick={googleSigninHandler}>Sign in with Google</button>
      <button onClick={googleSignOutHandler}>Sign out with Google</button>
    </div>
  );
}

export default App;
