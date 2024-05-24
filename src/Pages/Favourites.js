import React, {useContext, useEffect, useState} from 'react';
import Header from "../Components/Header/Header";
import {Firebase} from "../firebase/config";
import {AuthContext} from "../contextStore/AuthContext";
import PostCard from "../Components/PostCards/PostCard";
import './Favourites.css'
import {useHistory} from "react-router-dom";

function Favourites(props) {

    const {user} = useContext(AuthContext);
    const history = useHistory();

    const [posts, setPosts] = useState([]);

    let favouritePosts = []

    useEffect(() => {
        fetchPosts()
    }, [setPosts])

    const fetchPosts = async () => {
        if (!!user) {
            let favouritePostsRaw = await Firebase.firestore().collection("user_favourites").where("userId", "==", user.uid).get()
            favouritePostsRaw = favouritePostsRaw.docs
            favouritePostsRaw.map((data, index) => {
                const product = data.data()
                favouritePosts.push(product)
            })
            setPosts(favouritePosts);
        }
    }

    return (<React.Fragment>
        <Header/>
        {!user && (
            <div id="loginHeader" onClick={(e) => (history.push("/login"))}>Login to view favourites</div>)}
        {!!user &&
            (<div>
                <div id="header">
                    Favourites
                </div>
                <div id="cardContainer">
                    {posts.map((post, index) => (<PostCard product={post} key={index} isFavourite={true}/>))}
                </div>

            </div>)}
    </React.Fragment>);
}

export default Favourites;
 
