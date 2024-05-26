import React, {useContext} from 'react'
import Heart from '../../assets/Heart'
import {useHistory} from "react-router-dom";
import {PostContext} from "../../contextStore/PostContext";
import "./PostCard.css"
import Trash from "../../assets/Trash";
import {Firebase} from "../../firebase/config";
import {AuthContext} from "../../contextStore/AuthContext";

function PostCard({product, index, isFavourite=false}) {
    let {setPostContent} = useContext(PostContext)//at the time of onClick on post ,the specified post item assigned to postContent by setPostContent function and it will be stored in a global context PostContext
    let productInfo = product;
    const history = useHistory()//at the time of onClick on post , we want redirect to the view post page
    const imagePlaceholder = "https://archive.org/download/placeholder-image/placeholder-image.jpg"

    const {user} = useContext(AuthContext);

    function handleFavouriteClick(event, user) {
        setPostContent(product)

        if (!!user && !!product) {
            Firebase.firestore()
                .collection("user_favourites")
                .add({
                    userId: user.uid,
                    favouritedAt: new Date().toDateString(),
                    productID: product?.id,
                    name: product?.name,
                    price: product?.price,
                    description: product?.description,
                    images: product?.images,
                    model: product?.model,
                    creatorID: product?.userId,
                    createdAt: product?.createdAt
                })
        }
    }

    return (<div className="card-container">
            <div className="card" key={index} onClick={() => {
                setPostContent(product)
                history.push("/view")
            }}>
                <div className='image-container'>
                    <div className="image">
                        <img src={!!product.images.length ? product.images[0] : imagePlaceholder} alt="" onError={(event)=> (event.target.src = imagePlaceholder)} />
                    </div>
                </div>
                <div className="content">
                    <div id='content-left'>
                        <p className="name"> {product.name}</p>
                    </div>
                    <div id='content-right'>
                        <p className="rate">{product.price} ₴</p>
                    </div>
                </div>
            </div>
            <div className="card-overlay">
                {!isFavourite && <div className="favorite">
                    <Heart handleClick={(event) => (handleFavouriteClick(event, user))}/>
                </div>}

            </div>

        </div>

    )
}

export default PostCard
