import React, {Fragment, useState, useContext} from "react";
import "./Create.css";
import Header from "../Header/Header";
import {Firebase} from "../../firebase/config";
import {AuthContext} from "../../contextStore/AuthContext";
import {useHistory} from "react-router";
import GoLoading from "../Loading/GoLoading";

const Create = () => {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    let [name, setName] = useState("");
    let [category, setCategory] = useState("");
    let [price, setPrice] = useState("");
    let [description, setDescription] = useState("");
    const imagePlaceholders = Array(10).fill("https://img.freepik.com/premium-vector/camera-icon-isolated-white-background-vector-illustration_230920-1820.jpg?w=150&h=150", 0)
    let [images, setImages] = useState(imagePlaceholders);
    let [loading, setLoading] = useState(false);
    const handleSubmit = () => {


        setLoading(true);
        let date = `new Date().toDateString();`

        if (image?.name) {
            Firebase.storage()
                .ref(`/image/${image.name}`)
                .put(image)
                .then(({ref}) => {
                    ref.getDownloadURL().then((url) => {
                        Firebase.firestore()
                            .collection("products")
                            .add({
                                name,
                                category,
                                price,
                                description,
                                url,
                                userId: user.uid,
                                createdAt: date.toString(),
                            })
                            .then(() => {
                                history.push("/");
                            });
                    });
                }).catch((reason) => console.log(reason));
        } else {
            Firebase.firestore()
                .collection("products")
                .add({
                    name,
                    category,
                    price,
                    description,
                    url: image,
                    userId: user.uid,
                    createdAt: date.toString(),
                })
                .then(() => {
                    history.push("/");
                });

        }
    };
    return (
        <Fragment>
            <Header showSearch={false}/>
            {loading && <GoLoading/>}
            <div id='centerDiv'>
                <div className="metadataBlock">
                    <label>Name</label>
                    <br/>
                    <input
                        className="inputs"
                        type="text"
                        name="Name"
                        placeholder='ex. Car model'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        required
                    />
                    <br/><br/>
                    <label>Genres</label>
                    <br/>
                    <input
                        className="inputs"
                        type="text"
                        name="Genres"
                        // value={name}
                        // onChange={(e) => {
                        //     setName(e.target.value);
                        // }}
                        required
                    />
                </div>
                <div className="metadataBlock">
                    <label>Description</label>
                    <br/>
                    <input
                        className="inputs"
                        type="text"
                        name="Description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <br/>
                    <br/>
                    <label>Price</label>
                    <br/>
                    <input
                        className="inputs"
                        type="number"
                        name="Price"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                    />
                    <br/>
                </div>

                <br/>
                <div className="metadataBlock">
                    <div id='imagesBlock'>
                        {images?.map((image, index) => (
                            <img
                                alt="Posts"
                                width="200px"
                                height="200px"
                                src={image}
                            />
                        ))}
                    </div>

                    <br/>
                    <div id='imageInputBlock'>
                        <input
                            type="file"
                            onChange={(e) => {
                                setImages(e.target.files[0]);
                            }}
                        />
                    </div>

                    <br/>
                </div>

                <div className="metadataBlock">
                    3D Model
                    <div id='modelInputBlock'>
                        <input
                            type="file"
                        />
                    </div>
                </div>
                <button className="uploadBtn" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </Fragment>
    );
};

export default Create;
