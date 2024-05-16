import React, {useContext, useEffect} from "react";
import {AllPostContext} from "../../contextStore/AllPostContext";
import "./Featured.css";
import PostCard from "../PostCards/PostCard";
import {Firebase} from "../../firebase/config";

function Featured() {
    const {allPost, setAllPost} = useContext(AllPostContext)
    // todo refactor below
    useEffect(() => {
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
    }, [setAllPost]);

    const getRandomItems = (arr, numItems = 3) => {
        // Check if the requested number of items is greater than the array length

        const randomItems = [];
        if (!arr.length) return randomItems;
        const items = [...arr];
        for (let i = 0; i < numItems; i++) {
            // Generate a random index within the array bounds
            const randomIndex = Math.floor(Math.random() * arr.length);
            // Push the item at the random index to the new array
            randomItems.push(arr[randomIndex]);
            items.splice(randomIndex,1)
        }
        return randomItems;
    }

    let displayCards = getRandomItems(allPost, 5).map((product, index) => {
        return (
            <PostCard class="featuredCard" product={product} index={index} key={index}/>
        )
    });


    return (
        <div className="featuredContainer">
            <div className="featuredText">
                FEATURED MODELS
            </div>
            <div className="featuredCardContainer">
                {displayCards}
            </div>
        </div>

    );
}

export default Featured;
