import React, {useState} from "react";
import DynamicPosts from "../DynamicPosts/DynamicPosts";

import "./CustomInput.css";
import {Input} from "@chakra-ui/react";

function CustomInput({inputName, value, placeholder, change}) {

    return (
        <div className="CustomInput">
            <div id='title'>
                {inputName.toUpperCase()}
            </div>
            <Input value={value} placeholder={placeholder} id='input' onChange={(e) => change(e.target.value)}/>
        </div>
    );
}

export default CustomInput;