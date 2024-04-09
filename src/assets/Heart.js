import React, {useContext, useRef} from 'react'

export default function Heart({handleClick}) {

    const heartRef = useRef(null)

    function handleFocus(event) {
        heartRef.current.src = (event.type === "mouseout" ? "https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png" : "https://icons.iconarchive.com/icons/designbolts/free-valentine-heart/256/Heart-icon.png")
    }

    return (
        <img id="heart" ref={heartRef}
             src="https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png"
             onClick={handleClick}
             onMouseEnter={handleFocus} style={{width: '25px', height: '25px'}}
             onMouseOut={handleFocus} style={{width: '25px', height: '25px'}}/>
    )
}