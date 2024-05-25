import React, {Fragment, useState, useContext, useEffect} from "react";
import "./Create.css";
import Header from "../Header/Header";
import {Firebase, storage} from "../../firebase/config";
import {ref, uploadBytesResumable, getDownloadURL} from '@firebase/storage';
import {AuthContext} from "../../contextStore/AuthContext";
import {useHistory} from "react-router";
import GoLoading from "../Loading/GoLoading";

const Create = () => {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    let [name, setName] = useState("");
    let [genres, setGenres] = useState("");
    let [description, setDescription] = useState("");
    let [price, setPrice] = useState("");

    let [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);


    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedModelData, setUploadedModelData] = useState('');
    const [error, setError] = useState(null);
    const [uploadedImagesForDisplay, setImagesToDisplay] = useState([]);

    const imagePlaceholder = "https://img.freepik.com/premium-vector/camera-icon-isolated-white-background-vector-illustration_230920-1820.jpg?w=150&h=150";

    const handleFileChange = (event) => {
        const newImages = Array.from(event.target.files); // Convert FileList to array
        setSelectedImages([...selectedImages, ...newImages]); // Append new selections
    };

    useEffect(() => {
        handleUpload()
    }, [selectedImages]);

    const handleUpload = async () => {
        if (!selectedImages.length) return;

        // Reset overall upload progress
        setUploadProgress(0);

        const uploadPromises = selectedImages.map(async (image) => {
            const imageRef = ref(storage, `images/${+Date.now() + '_' + image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const individualProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // Calculate average progress across all uploads
                    const totalProgress = (uploadPromises.length * individualProgress) / 100;
                    setUploadProgress(totalProgress);

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is in progress...');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    setError(error.message);
                },
                async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    setImagesToDisplay(uploadedImagesForDisplay => [...uploadedImagesForDisplay, downloadUrl]);
                }
            );

            return this;// Return promise for chaining
        });

        await Promise.all(uploadPromises); // Wait for all uploads to finish
        setSelectedImages([]); // Clear selections after successful upload
    };

    const handleModelChange = (event) => {
        const model = event.target.files?.[0];

        const modelRef = ref(storage, `models/${+Date.now() + '_' + model.name}`);
        const uploadTask = uploadBytesResumable(modelRef, model)

        uploadTask.on(
            'state_changed',
            (snapshot) => {

                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is in progress...');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                setError(error.message);
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                setUploadedModelData( downloadUrl);
            }
        );
    }

    const handleSubmit = () => {

        setLoading(true);
        let date = new Date().toDateString();

        if (!!name && !!description && !!uploadedImagesForDisplay?.length && !!uploadedModelData?.length) {
            Firebase.firestore()
                .collection("products")
                .add({
                    name,
                    genres: (genres + "") .toLowerCase(),
                    description,
                    price,
                    images: uploadedImagesForDisplay,
                    model: uploadedModelData,
                    userId: user.uid,
                    createdAt: date.toString(),
                })
                .then(() => {
                    history.push("/");
                }).then(()=> setLoading(false));

        } else {
            window.alert("Please enter a valid data!\n name/description/images/model is empty");
            setLoading(false);
        }

    }
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
                        value={genres}
                        onChange={(e) => {
                            setGenres(e.target.value);
                        }}
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
                        {(!!uploadedImagesForDisplay.length ? uploadedImagesForDisplay : [imagePlaceholder])?.map((image, index) => (
                            <img
                                alt="Posts"
                                width="100px"
                                height="100px"
                                src={image}
                                key={index}
                            />
                        ))}
                    </div>

                    <br/>
                    <div id='imageInputBlock'>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>

                    <br/>
                </div>

                <div className="metadataBlock">
                    3D Model
                    <div id='modelInputBlock'>
                        <input
                            type="file"
                            onChange={handleModelChange}
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
