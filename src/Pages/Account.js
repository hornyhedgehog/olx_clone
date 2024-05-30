import React, {useContext, useEffect, useState} from 'react';

import {Firebase} from '../firebase/config';
import {AuthContext} from '../contextStore/AuthContext';
import './Account.css'
import Header from "../Components/Header/Header";
import CustomInput from "../Components/CustomInput/CustomInput";
import PostCard from "../Components/PostCards/PostCard";

function Account(props) {
    const {setUser, user} = useContext(AuthContext)
    const [userDetails, setUserDetails] = useState({});

    const [rightPanel, setRightPanel] = useState(<div/>);
    useEffect(() => {

        Firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
        })

    }, [setUser])

    useEffect(() => {

        Firebase.firestore()
            .collection("users")
            .where("id", "==", user.uid)
            .get()
            .then((res) => {
                res.forEach((doc) => {
                    setUserDetails(doc.data());
                    setRightPanel(<Profile user={doc.data()}/>)
                });
            });

    }, [user])

    function handleItemSelected(tabName) {
        let componentToRender;
        switch (tabName) {
            case 'profile':
                componentToRender = <Profile user={userDetails}/>
                break;
            case 'models':
                componentToRender = <MyModels user={userDetails}/>
                break;
            case 'settings':
                componentToRender = <Settings user={userDetails}/>
                break;
            case 'sign_out':
                componentToRender = <SignOut user={userDetails}/>
        }

        setRightPanel(componentToRender)

    }
// '@' + user.email.split('@')[0] ||
    return (
        <React.Fragment>
            <Header showSearch={false}/>
            <div id="pageContainer">
                <div id="left-panel">
                    <div id="avatarAndName">
                        <div id="avatar">
                            <img id="avatar-image"
                                 src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
                                 alt='avatarka'/>
                        </div>
                        <div id='userName'>
                            {user.name || 'Vitaliy Kusiak'}
                        </div>
                        <div id='nickname'>
                            { '@vkusiak'}
                        </div>

                    </div>
                    <div id="link-list">
                        <ul>
                            <li onClick={() => (handleItemSelected('profile'))}>Профіль</li>
                            <li onClick={() => (handleItemSelected('models'))}>Мої моделі</li>
                            <li onClick={() => (handleItemSelected('settings'))}>Налаштування</li>
                            <li onClick={() => (handleItemSelected('sign_out'))}>Вихід</li>
                        </ul>

                    </div>
                </div>
                <div id="right-panel">
                    {rightPanel}
                </div>

            </div>
        </React.Fragment>
    )
        ;
}

// <CustomInput inputName='Username' value={!!user ? ('@' + user?.email?.split('@')?.[0]) : '@vkusiak'}/>
function Profile({user}) {
    return (<React.Fragment>
        <div id='profileTitle'>
            Профіль
        </div>
        <div id='inputs'>
            <CustomInput inputName="Ім`я" value={user?.name}/>
            <CustomInput inputName="Ім`я користувача" value={'@vkusiak'}/>
            <CustomInput inputName='Пошта' value={user?.email}/>
            <CustomInput inputName='Номер телефону' value={user?.phone} placeholder='+3801231231'/>
            <CustomInput inputName='Країна' placeholder='Україна'/>
            <CustomInput inputName='Місто' placeholder='Львів'/>
            <CustomInput inputName='Адреса' placeholder='Площа Героїв України будинок 14 квартира 88'/>
        </div>
    </React.Fragment>)
}

function MyModels({user}) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchMyPosts()
    }, [setPosts])

    const fetchMyPosts = async () => {
        const myPosts = []
        if (!!user) {
            let myPostsRaw = await Firebase.firestore().collection("products").where("userId", "==", user.id).get()
            myPostsRaw = myPostsRaw.docs
            myPostsRaw.map((data, index) => {
                myPosts.push(data.data())
            })
            setPosts(myPosts);
        }
    }

    return (<React.Fragment>
        <div id="container-mypost">
            {!!posts.length &&
            posts.map((post, index) => (
                <PostCard class="featuredCard" product={post} index={index} key={index}/>
            ))}
        </div>
    </React.Fragment>)
}

function Settings(props) {
    return null;
}

function SignOut(props) {
    return null;
}

export default Account;
 
