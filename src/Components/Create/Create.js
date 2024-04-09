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
    let [image, setImage] = useState("");
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
            <Header/>
            {loading && <GoLoading/>}
            <div className="centerDiv">
                <label>Name</label>
                <br/>
                <input
                    className="input"
                    type="text"
                    name="Name"
                    placeholder='ex. Car model'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    required
                />
                <br/>
                <label>Price</label>
                <br/>
                <input
                    className="input"
                    type="number"
                    name="Price"
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    required
                />
                <br/>
                <label>Description</label>
                <br/>
                <input
                    className="input"
                    type="text"
                    name="Description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <br/>

                <br/>
                <img
                    alt="Posts"
                    width="200px"
                    height="200px"
                    src={image?.name ? URL.createObjectURL(image) : image}
                ></img>

                <br/>
                <div id='imageInputBlock'>
                    <input className='input' placeholder='Image URL'  onChange={(e) => {
                        setImage(e.target.value);
                    }}/>
                    <input
                        type="file"
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                        }}
                    />
                </div>

                <br/>
                <button className="uploadBtn" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </Fragment>
    );
};

export default Create;
