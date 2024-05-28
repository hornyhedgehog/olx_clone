import React, { useState } from "react";
import {Link, useLocation} from "react-router-dom";
import {useHistory} from "react-router-dom";
import { Firebase } from "../../firebase/config";
import Logo from "../../olx-logo.png";
import RoundLoading from "../Loading/RoundLoading";
import "./Login.css";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading,setLoading]=useState(false)
  const location = useLocation()
  let [redirectTo, setRedirectTo] = useState(location?.state);
  const history = useHistory()

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      if (history?.location?.state === "chat-login"){
        history.push("/chat")
      } else  history.push("/")

    }).catch((error)=>{
      alert(error.message)
    })

  };
  return (<>
    {loading && <RoundLoading/> }
    <div id="background">
      <div className="loginParentDiv">
        <div>
          <div id="loginLogoText">
            PRINTING HOUSE
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <br />
          <input
            className="input"
            type="email"
            placeholder="Електронна пошта"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br/>
          <button>Увійти</button>
        </form>
        <br/>
        <div id="loginSignUp">
          <Link to="/signup">Зареєструватись</Link>
        </div>

      </div>
    </div>
    </>
  );
}

export default Login;
