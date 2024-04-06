import React, {useRef} from 'react'
import favouritesContext from "../contextStore/FavouritesContext";

export default function Trash(props) {

    const {product} = props


    const heartRef = useRef(null)

    function handleFocus(event) {
        heartRef.current.src = (event.type === "mouseout" ? "https://static-00.iconduck.com/assets.00/heart-icon-512x461-rdoishra.png" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8rhnbyViBii9Zgp_nz81682wg65hhxTG_9edPgQw15w&s")
    }

    function handleClick(event) {
        console.log("clicked on heart: " + product.name)
    }

    const heartImage = product
    return (
        <img id="heart" ref={heartRef} src="https://cdn.icon-icons.com/icons2/2091/PNG/512/heart_icon_128499.png"
             onMouseEnter={handleFocus} style={{width: '15px', height: '15px'}}
             onMouseOut={handleFocus} style={{width: '15px', height: '15px'}} onClick={handleClick}/>
    )
}