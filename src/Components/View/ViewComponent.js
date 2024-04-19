import React, {useContext, useEffect, useState} from "react";
import {PostContext} from "../../contextStore/PostContext";
import {Firebase} from "../../firebase/config";
import {useHistory} from "react-router";
import "./ViewComponent.css";
import {DetailsCarousel} from "../Carousel/DetailsCarousel";

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
    return (
        <React.Fragment>
            <div className="viewParentHorizontalDiv">
                <div className="imageShowDiv">
                    <DetailsCarousel
                        showStatus={false}
                        showArrows={true}>
                        <div>
                            <img src={postContent.url}/>
                        </div>
                        <div>
                            <img src={postContent.url}/>
                        </div>
                        <div>
                            <img src={postContent.url}/>
                        </div>
                        <div>
                            <img src={postContent.url}/>
                        </div>
                        <div>
                            <img src={postContent.url}/>
                        </div>
                        <div>
                            <img src={postContent.url}/>
                        </div>
                        <div>
                            <img src={postContent.url}/>
                        </div>
                        <div>
                            <img src={postContent.url}/>
                        </div>
                        <div>
                            <img src={postContent.url}/>
                        </div>
                        <div>
                            <img src={postContent.url}/>
                        </div>


                    </DetailsCarousel>
                </div>
                {" "}
                <div className="rightSection">
                    <div className="productDetails">
                        <span>{postContent.name}</span>
                        <p>{postContent.category}</p>
                        <p className={'productPrice'}>{postContent.price} </p>
                        <p className={'shortDescription'}>{postContent?.shortDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
                        <button className="preview-button">Preview model</button>
                        <button className="download-button">Download model</button>
                        <p>Created {postContent.createdAt}</p>
                    </div>

                </div>

            </div>
            <div className="bottomVerticalSection">
                <div className="descriptionSection">
                    {/*{postContent?.description &&*/}
                        <div className="productDescription">
                            <p className="p-bold">Product Description</p>
                            <p>{postContent.description || "While the model has high details and is better suitable for printing on an SLA printer, it can also be printed on an FDM printer, especially at a higher scale. You'll find two pre-sliced G-codes in the files section, which use PrusaSlicer's organic supports for easy removal."}</p>

                        </div>

                    {userDetails &&
                        <div className="contactDetails">
                            <p className="p-bold">Customer details</p>
                            <p>Name : {userDetails.name}</p>
                            <p>Phone : {userDetails.phone}</p>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default ViewComponent;
