import React, {useState} from "react";
import {Link} from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import {Firebase} from "../../firebase/config";
import {useHistory} from "react-router";
import SignUpLoading from "../Loading/SignUpLoading";
import {background} from "@chakra-ui/react";

export default function Signup() {
    const history = useHistory();
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user.updateProfile({displayName: name}).then(() => {
                    Firebase.firestore().collection("users").doc(result.user.uid).set({
                        id: result.user.uid,
                        name: name,
                        phone: phone,
                    });
                });
            })
            .then(() => {
                history.push("/login");
            });
    };
    return (<>
            {loading && <SignUpLoading/>}
            <div id='background'>
                <div className="signupParentDiv">
                    <div>
                        <div id="signupLogoText">
                            PRINTING HOUSE
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <br/>
                        <input
                            className="input"
                            type="text"
                            placeholder="Ім'я"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                        />
                        <br/>
                        <input
                            className="input"
                            type="email"
                            placeholder="Електронна пошта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                        />
                        <br/>
                        <input
                            className="input"
                            type="number"
                            placeholder="Номер телефону"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            name="phone"
                        />
                        <br/>
                        <input
                            className="input"
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                        />
                        <br/>
                        <br/>
                        <button>Зареєструватись</button>
                    </form>
                    <br/>
                    <div id="loginSignUp">
                        <Link to="/login">Увійти</Link></div>
                </div>
            </div>
        </>
    );
}
