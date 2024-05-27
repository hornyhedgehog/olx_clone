import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";

import "./Posts.css";
import {Firebase} from "../../firebase/config";
import BarLoading from "../Loading/BarLoading";
import PostCard from "../PostCards/PostCard";

import {AllPostContext} from "../../contextStore/AllPostContext";
import {AuthContext} from "../../contextStore/AuthContext";

function Posts() {
    const {setAllPost} = useContext(AllPostContext);
    let [posts, setPosts] = useState([]); //for showing all posts in Descending order of date
    let [posts2, setPosts2] = useState([]); //for showing all posts in Ascending order of date
    let [loading, setLoading] = useState(false);
    let [loading2, setLoading2] = useState(false)
    const [favposts, setfavPosts] = useState([]);
    const {user} = useContext(AuthContext);

    let favouritePosts = []

    useEffect(() => {
        fetchPosts()
        setLoading(true);
        setLoading2(true)
        Firebase.firestore() //retreving all posts from firebase in descending order
            .collection("products")
            .orderBy("createdAt", "desc")
            .get()
            .then((snapshot) => {
                let allPostsDescendingOder = snapshot.docs.map((product) => {
                    return {
                        ...product.data(), id: product.id,
                    };
                });
                setPosts2(allPostsDescendingOder); //set to post
                setAllPost(allPostsDescendingOder);
                setLoading(false);
            });
        Firebase.firestore() //retreving all posts from firebase in asecnding order of date
            .collection("products")
            .orderBy("createdAt", "asc")
            .get()
            .then((snapshot) => {
                let allPostsAscendingOder = snapshot.docs.map((product) => {
                    return {
                        ...product.data(), id: product.id,
                    };
                });
                setPosts(allPostsAscendingOder);
                setLoading2(false)

            });


    }, [setAllPost]);

    const fetchPosts = async () => {
        if (!!user) {
            let favouritePostsRaw = await Firebase.firestore().collection("user_favourites").where("userId", "==", user.uid).get()
            favouritePostsRaw = favouritePostsRaw.docs
            favouritePostsRaw.map((data, index) => {
                const product = data.data()
                favouritePosts.push(product.productID)
            })
            setfavPosts(favouritePosts);
        }
    }

     fetchPosts();
    // quickMenuCards assign all cards of post item later it will be displayed
    let quickMenuCards = posts.map((product, index) => {
        return (<div className="quick-menu-cards" key={index}><PostCard product={product} index={index} isFavourite={favposts.includes(product.id)}/></div>);
    });

    let freshRecomendationCards = posts2.map((product, index) => {
        if (index < 4) {
            return (<div className="fresh-recomendation-card" key={index}><PostCard product={product} index={index}/>
            </div>);
        }
        return null
    });
    return (
        <div>
            {posts && !loading && (
                <div id='allModelsContainer'>
                    <div id='heading'>
                        ВСІ МОДЕЛІ
                    </div>
                    <div>
                        <div className="posts-list"> {quickMenuCards}</div>
                    </div>
                </div>
            )}
            {loading && (
                <BarLoading/>
            )}
        </div>);
}

export default Posts;
