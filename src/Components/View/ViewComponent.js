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
                        <span>{postContent.name}</span>
                        <p>{postContent.genres}</p>
                        <p className={'productPrice'}>{postContent.price} </p>
                        <button className="preview-button">Preview model</button>
                        <button className="download-button">Download model</button>
                        <p>Created {postContent.createdAt}</p>
                    </div>

                </div>s

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
