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
                    <h1>Printing house chat</h1>
                    <SignOut/>
                </header>

                <section>
                    {user ? <ChatRoom/> : <SignIn/>}
                </section>

            </div>
        </div>

    );
}

const ChatToggle = ({ isOpen, onClick }) => {
  const arrowClass = isOpen ? 'arrow-right' : 'arrow-left'; // Dynamic arrow direction

  return (
      <button className={`chat-toggle ${arrowClass}`} onClick={onClick}>
        <img src="https://www.reshot.com/preview-assets/icons/VKPFEUXQC9/left-arrow-square-VKPFEUXQC9-791d0.svg" alt="Chat Toggle" />
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
            <button className="sign-in" onClick={() => history.push("/login", "chat-login")}>Sign in to chat</button>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
        </>
    )

}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
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
                   placeholder="say something nice"/>

            <button type="submit" disabled={!formValue}>🕊️</button>

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
