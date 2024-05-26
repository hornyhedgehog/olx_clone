import React, {useContext, useEffect} from 'react';

import Header from '../Components/Header/Header';
import {AuthContext} from '../contextStore/AuthContext';
import {AllPostContext} from "../contextStore/AllPostContext";
import PostCard from "../Components/PostCards/PostCard";
import {Firebase} from "../firebase/config";

function SearchResults(props) {
    const {setUser} = useContext(AuthContext)
    const {allPost, setAllPost} = useContext(AllPostContext)

    useEffect(() => {
        if (allPost.length === 0) {
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
                    setAllPost(allPostsDescendingOder);
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

                });
        }

    }, [setAllPost]);


    const results = allPost.filter((value) => {
        return value.name.toLowerCase().includes(props.match.params.filter.toLowerCase());
    });


    return (
        <div>
            <Header value={props.match.params.filter}/>
            <div id="header">
                Результат пошуку &quot;{props.match.params.filter}&quot;
            </div>
            <div id="cardContainer">
                {results.map((value, index) => <PostCard product={value} key={index}/>)}
            </div>
        </div>
    );
}

export default SearchResults;
 
