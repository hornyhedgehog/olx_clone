import React, {Fragment, useContext, useState, useEffect} from "react";
import Create from "../Components/Create/Create";
import {AuthContext} from "../contextStore/AuthContext";
import Login from "../Components/Login/Login";
import {useHistory, useParams} from "react-router-dom"
import {Firebase} from "../firebase/config";
import Header from "../Components/Header/Header";
import PostCard from "../Components/PostCards/PostCard";
import './Ganers.css'

const GanersPage = (props) => {
    // const {user} = useContext(AuthContext);
    // const {a} = useParams();
    // window.open('' + a);
    const {user} = useContext(AuthContext);
    const history = useHistory();

    const [posts, setPosts] = useState([]);

    let favouritePosts = []

    useEffect(() => {
        fetchPosts()
    }, [setPosts])

    const ganre = props.match.params["ganerHash"]

    const fetchPosts = async () => {
        let favouritePostsRaw = await Firebase.firestore().collection("products").get();

        favouritePostsRaw = favouritePostsRaw.docs
        favouritePostsRaw.map((data, index) => {
            const product = data.data()
            if (product.genres.toLowerCase().includes(ganre.toLowerCase()))
                favouritePosts.push(product)
        })
        setPosts(favouritePosts);
    }

    console.log(posts.map((post, index) => (console.log(post, index))))
    return (<React.Fragment>
        <Header/>
        <div>
            <div className="header">
                Всі моделі за жанром: {ganre}
            </div>
            <div className="cardContainerGeners">
                {posts.map((post, index) => (<PostCard product={post} key={index}/>))}
            </div>

        </div>
    </React.Fragment>);
};

export default GanersPage;
