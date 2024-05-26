import React, {useContext, useEffect, useState} from "react";
import {PostContext} from "../../contextStore/PostContext";
import {Firebase} from "../../firebase/config";
import {useHistory} from "react-router";
import "./ViewComponent.css";
import {DetailsCarousel} from "../Carousel/DetailsCarousel";
import ModelViewer from "../ModelViewer/ModelViewer";

function ViewComponent() {
    let {postContent} = useContext(PostContext);//from the global store PostContext we can get information about desired product post that we want to show (the user is clicked item on the card)

    const [userDetails, setUserDetails] = useState();//we want show the details of who is posted the add and we dont know,so we want retreive user data from firebase who is posted this add
    const history = useHistory();//if user click the refresh of the page then PostContext data will be erased so it will throws an error so that time we want redirect this page to home page
    useEffect(() => {
        let {userId} = postContent;
        if (userId === undefined) {
            history.push("/");
        } else {
            Firebase.firestore()
                .collection("users")
                .where("id", "==", userId)
                .get()
                .then((res) => {
                    res.forEach((doc) => {
                        setUserDetails(doc.data());
                    });
                });
        }
    }, [history, postContent]);

    const postGaners = postContent.genres;
    const strCopy = postGaners.split(" ");


    return (
        <React.Fragment>
            <div className="viewParentHorizontalDiv">
                <div className="imageShowDiv">
                    <DetailsCarousel
                        showStatus={false}
                        showArrows={true}>
                        {postContent.images.map((image, i) => (<div key={i}>
                            <img src={image} key={i + '_image'}/>
                        </div>))}
                        <div>
                            <ModelViewer src={postContent.model}/>
                        </div>
                    </DetailsCarousel>
                </div>
                {" "}
                <div className="rightSection">
                    <div className="productDetails">
                        <span className="itemName">{postContent.name}</span>
                        <ol className="ganers-list">
                            {strCopy.map((item) => (
                                <li className={"ganers-list-item"} key={item}>{<button className="ganers-button"
                                                                                       onClick={() => history.push(`/ganers/${item}`)}>{"<   " + item + ""}</button>}</li>
                            ))}
                        </ol>
                        {/*<p>{postContent.genres}</p>*/}
                        <p className={'productPrice'}>{"Ціна: " + postContent.price + "₴"} </p>
                        <div className="model-buttons-box">
                            <button className="preview-button"><img
                                src="https://static.thenounproject.com/png/4937104-200.png" alt='3d'
                                className="previewImage"/></button>
                            <button className="download-button"><i className="fa fa-download"></i> Завантажити</button>
                        </div>
                        <p>Created {postContent.createdAt}</p>
                    </div>

                </div>
                s

            </div>
            <div className="bottomVerticalSection">
                <div className="descriptionSection">
                    {/*{postContent?.description &&*/}
                    <div className="productDescription">
                        <p className="p-bold">Product Description</p>
                        <p>{postContent.description || "While the model has high details and is better suitable for printing on an SLA printer, it can also be printed on an FDM printer, especially at a higher scale. You'll find two pre-sliced G-codes in the files section, which use PrusaSlicer's organic supports for easy removal."}</p>

                    </div>

                    {!!userDetails &&
                        <div className="contactDetails">
                            <p className="p-bold">Customer details</p>
                            <p>Name : {userDetails?.name}</p>
                            <p>Phone : {userDetails?.phone}</p>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default ViewComponent;
