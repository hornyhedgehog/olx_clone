import React, {useRef, useState} from 'react';
import './Chat.css';

import {storage, Firebase, Auth, Firestore} from '../../firebase/config'

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {useHistory} from "react-router-dom";

const auth = Auth;
const firestore = Firestore;


function Chat() {

    const [user] = useAuthState(auth);
    const [isOpen, setIsOpen] = useState(false); // State to track chat visibility
    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`chat-container ${isOpen ? 'open' : ''}`}>
            <ChatToggle isOpen={isOpen} onClick={toggleChat}/>
            <div className="Chat">
                <header>
                    <h1 className={"headerText"}>Чат</h1>
                    <SignOut/>
                </header>

                <section>
                    {user ? <ChatRoom/> : <SignIn/>}
                </section>

            </div>
        </div>

    );
}

const ChatToggle = ({isOpen, onClick}) => {
    const arrowClass = isOpen ? 'arrow-right' : 'arrow-left'; // Dynamic arrow direction

    return (
        <button className={`chat-toggle`} onClick={onClick}>
            Поспілкуємось?
        </button>
    );
};

function SignIn() {

    const history = useHistory()
    const signInWithGoogle = () => {
        const provider = new Auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
            <button className="sign-in" onClick={() => history.push("/login", "chat-login")}>Вхід</button>
            <p>За порушення правил спільноти ви будете довічно забанені </p>
        </>
    )

}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Вийти</button>
    )
}


function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const {uid, photoURL} = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: new Date().getUTCMilliseconds(),
            uid,
            photoURL: !!photoURL ? photoURL : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
        })

        setFormValue('');
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }

    return (<>
        <main>

            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

            <span ref={dummy}></span>

        </main>

        <form onSubmit={sendMessage}>

            <input id="message-input" value={formValue} onChange={(e) => setFormValue(e.target.value)}
                   placeholder="Напиши тут автору оголошення"/>

            <button type="submit" className={"submitButton"} disabled={!formValue}>
                <svg className={"submitButtonIcon"}
                     viewBox="0 0 512 512">
                    <path
                        d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/>
                </svg>
            </button>

        </form>
    </>)
}


function ChatMessage(props) {
    const {text, uid, photoURL} = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}/>
            <p>{text}</p>
        </div>
    </>)
}


export default Chat;
