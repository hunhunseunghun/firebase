import logo from './logo.svg';
import './App.css';
import axios from "axios"

import {Routes,Route,Navigate} from "react-router-dom"

import {useEffect,useState} from "react"
import { auth, firebaseDB , dbRef, writeUserData} from "./Firebase.jsx"
// google Oauth
import { getAuth, signOut,setPersistence,browserSessionPersistence, getRedirectResult, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";






// kakao 전역객체 사용 --------------------

/*global Kakao*/

//--------------------------------------

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
// 카카오 로그인 --------------------------------------------------------

// const kakaoLogin = () => {
//   const redirectUri = "http://localhost:3000"
//   Kakao.Auth.authorize({
//     redirectUri: redirectUri})
  
// }

// useEffect(() => {
//   console.log(window.location.search)
//   // 카카오톡 로그인 인가 코드 query params에서 추출
//   const searchParams = new URLSearchParams(window.location.search)
//   // 카카오톡 로그인 인가 코드
//   const code = searchParams.get("code")
  
//   if(code.length){

//    axios({
//     url: `https://kauth.kakao.com/oauth/token`,
//     method: 'post',
//     params: {
//       grant_type: 'authorization_code',
//       client_id: "1b390b2153d3c027714c4bae71801d02",
//       redirect_uri:"http://localhost:3000",
//       code: code,
//     },
//   });

//   }
// },[])



const onLoginWithKaKao = () => {
 


}

const kakaoCode = () => {
const url = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1b390b2153d3c027714c4bae71801d02&redirect_uri=https://localhost:3000/oauth/kakao"
axios.get(url).then((res)=>console.log(res))

}

    

const createUser = () => {
  createUserWithEmailAndPassword(getAuth(),email, password)
  .then((result) => {console.log(result.user)})
  .catch(err=>console.log(err))
}




const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const emailHandler = (e) => {
   setEmail(e.target.value)
}
const passwordHandler = e => {
   setPassword(e.target.value)
}


const firebaseLogin = () => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


}

// Firebase 로그인 여부 확인 ----------------------------------------
useEffect(() => {
  setPersistence(auth, browserSessionPersistence)
  .then((result) => {console.log(result)})
  .catch((error) => {console.log(error)})
// 현재 로그인 상태 확인
  onAuthStateChanged(getAuth(), (user) => {
    if(user){
      const uid = user.uid
      console.log(uid)
    }else {
      console.log("user signed out")
    }
  })
},[])


// const firebaseLoggedHandler = () => {

//   onAuthStateChanged(getAuth(), (user) => {
//     if(user){
//       const uid = user.uid
//       console.log(uid)
//     }else {
//       console.log("user signed out")
//     }
//   })

// }



// --------------------------------------------------------------
// 로그아웃 --------------------------------------------------------
const signoutHandler = () => {

  signOut(auth)
  .then(() => {console.log("signout succed")}) // logout successful
  .catch((error) => {console.log("signout error")}); // logout fail


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


      <div>
       <button onClick = {kakaoCode}>카카오로그인</button>
      </div>
      
      <div>
        Firebase 회원가입
        <button onClick ={createUser}>회원가입</button>
        <button onClick={firebaseLogin}>로그인</button>
      <input type="email" onChange={emailHandler}></input>
      <input type="password" onChange={passwordHandler}></input>
      <div>{email}</div>
      <div>{password}</div>

    
      </div>

      <div>
        <button onClick={signoutHandler}l>로그아웃</button>
      </div>

     
    </div>
  );
}

export default App;
