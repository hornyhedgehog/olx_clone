import React, {Fragment, useContext} from "react";
import Create from "../Components/Create/Create";
import {AuthContext} from "../contextStore/AuthContext";
import Login from "../Components/Login/Login";
import Account from "./Account";

const MyAccountPage = () => {
    const {user} = useContext(AuthContext);

    return (
        <Fragment>
            {user ? (
                <Account/>
            ) : (
                <Login/>
            )}
        </Fragment>
    );
};

export default MyAccountPage;
