import React, {useContext, useEffect} from 'react';

import {Firebase} from '../firebase/config';
import {AuthContext} from '../contextStore/AuthContext';
import './Favourites.css'
import Header from "../Components/Header/Header";

function Account(props) {
    const {setUser, user} = useContext(AuthContext)
    useEffect(() => {

        Firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
        })


    }, [setUser])

    return (
        <React.Fragment>
            <Header showSearch={false}/>
            <div id="pageContainer">
                <div id="left-panel">
                    <div id="avatar">
                        <img id="avatar-image"
                             src="https://musicart.xboxlive.com/7/4d4d6500-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080"
                             alt='avatar'/>
                    </div>
                    {user.name}
                    <div id="link-list">

                    </div>
                </div>
                <div id="right-panel">

                </div>

            </div>
        </React.Fragment>
    );
}

export default Account;
 
