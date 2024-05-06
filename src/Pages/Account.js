import React, {useContext, useEffect} from 'react';

import {Firebase} from '../firebase/config';
import {AuthContext} from '../contextStore/AuthContext';


function Account(props) {
    const {setUser} = useContext(AuthContext)
    useEffect(() => {

        Firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
        })


    }, [setUser])

    return (
        <div className="homeParentDiv">

        </div>
    );
}

export default Account;
 
