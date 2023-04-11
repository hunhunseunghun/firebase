import logo from './logo.svg';
import './App.css';
import { firebaseConfig1, firebaseDB , dbRef, writeUserData} from "./Firebase.jsx"

function App() {
  console.log(process.env.REACT_APP_PROJECT_ID)

const onclickHandler = () => {
  writeUserData()
  console.log("onclick executed")
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={onclickHandler}>TEST crud DATABASE</button>
    </div>
  );
}

export default App;
