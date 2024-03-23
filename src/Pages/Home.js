import React, {useEffect, useContext} from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import {Firebase} from '../firebase/config';
import {AuthContext} from '../contextStore/AuthContext';

function Home(props) {
    const {setUser} = useContext(AuthContext)
    useEffect(() => {

        Firebase.auth().onAuthStateChanged((user) => {
            setUser(user)

        })


    }, [setUser])

    return (
        <div className="homeParentDiv">
            <Header/>
            <Posts/>
        </div>
    );
}

export default Home;
 
