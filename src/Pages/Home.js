import React, {useEffect, useContext} from 'react';

import Header from '../Components/Header/Header';
import Featured from "../Components/Featured/Featured";

import {Firebase} from '../firebase/config';
import {AuthContext} from '../contextStore/AuthContext';
import NewestModels from "../Components/Newest/Newest";
import Posts from "../Components/Posts/Posts";


function PopularPrinter() {
    return null;
}

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
            <Featured/>
            <PopularPrinter/>
            <NewestModels/>
            <Posts/>
        </div>
    );
}

export default Home;
 
