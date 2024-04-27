import React, {useContext, useState} from "react";
import {useHistory} from "react-router";
import {AllPostContext} from "../../contextStore/AllPostContext";
import {PostContext} from "../../contextStore/PostContext";
import "./Header.css";
import Logo from "../../assets/Logo";
import SearchIcon from "../../assets/SearchIcon"
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import {Link} from "react-router-dom";
import {AuthContext} from "../../contextStore/AuthContext";
import {Firebase} from "../../firebase/config";
import Search from "../Search/Search";

function Header() {
    const {allPost} = useContext(AllPostContext)
    const {setPostContent} = useContext(PostContext)
    const history = useHistory();
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = allPost.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };
    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };
    const handleSelectedSearch = (value) => {
        setPostContent(value)
        history.push("/view")

    }
    const handleEmptyClick = () => {
        alert("No items found.., please search by product name");
    }
    const {user} = useContext(AuthContext);

    const logoutHandler = () => {
        Firebase.auth()
            .signOut()
            .then(() => {
                history.push("/login");
            });
    };
    return (
        <div className="headerParentDiv">
            <div className='headerTopBar'>
                <div className="favouritesLink" onClick={() => history.push("/favourites")}>
                    Favourites
                </div>
                <div className="accountLink" onClick={() => history.push("/account")}>
                    Account
                </div>
            </div>
            <div className="searchContainer">
                <div className="logo" onClick={() => history.push("/")}>
                    <Logo/>
                </div>
                <div className="searchBlock">
                    <div className="placeSearch">
                        <input type="text"
                               placeholder="Search specific product..."
                               value={wordEntered}
                               onChange={handleFilter}/>
                    </div>
                    <input className="searchButton" type="button"
                           value="search" onClick={handleFilter}/>
                </div>
            </div>
        </div>

    );
}

export default Header;
