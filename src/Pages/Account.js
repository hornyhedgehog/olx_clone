import React, {useContext, useEffect, useState} from 'react';

import {Firebase} from '../firebase/config';
import {AuthContext} from '../contextStore/AuthContext';
import './Account.css'
import Header from "../Components/Header/Header";
import CustomInput from "../Components/CustomInput/CustomInput";

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

    return (
        <React.Fragment>
            <Header showSearch={false}/>
            <div id="pageContainer">
                <div id="left-panel">
                    <div id="avatarAndName">
                        <div id="avatar">
                            <img id="avatar-image"
                                 src="https://musicart.xboxlive.com/7/4d4d6500-0000-0000-0000-000000000002/504/image.jpg?w=300&h=300"
                                 alt='avatarka'/>
                        </div>
                        <div id='userName'>
                            {user.name || 'Vitaliy Kusiak'}
                        </div>
                        <div id='nickname'>
                            {'@' + user.email.split('@')[0] || '@vkusiak'}
                        </div>

                    </div>
                    <div id="link-list">
                        <ul>
                            <li onClick={() => (handleItemSelected('profile'))}>Profile</li>
                            <li onClick={() => (handleItemSelected('models'))}>My Models</li>
                            <li onClick={() => (handleItemSelected('settings'))}>Settings</li>
                            <li onClick={() => (handleItemSelected('sign_out'))}>Sign out</li>
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

function Profile({user}) {
    return (<React.Fragment>
        <div id='profileTitle'>
            Profile
        </div>
        <div id='inputs'>
            <CustomInput inputName='Name' value={user?.name} />
            <CustomInput inputName='Username' value={ !!user ? ('@' + user?.email?.split('@')?.[0]) : '@vkusiak'} />
            <CustomInput inputName='Email' value={user?.email} />
            <CustomInput inputName='Phone' value={user?.phone} placeholder='+3801231231'/>
            <CustomInput inputName='Country' placeholder='Україна'/>
            <CustomInput inputName='City'  placeholder='Львів'/>
            <CustomInput inputName='Address'  placeholder='Червона площа будинок 14 квартира 88'/>
        </div>
    </React.Fragment>)
}

function MyModels(props) {
    return null;
}

function Settings(props) {
    return null;
}

function SignOut(props) {
    return null;
}

export default Account;
 
