import React, {useContext, useEffect, useRef} from 'react'

export default function Heart({handleClick, isFavorite = false}) {

    const heartRef = useRef(null)

    useEffect(() => {
        if (isFavorite)
            heartRef.current.src = "https://icons.iconarchive.com/icons/designbolts/free-valentine-heart/256/Heart-icon.png"
    });

    function handleFocus(event) {
        heartRef.current.src = (event.type === "mouseout" ? "https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png" : "https://icons.iconarchive.com/icons/designbolts/free-valentine-heart/256/Heart-icon.png")
    }

    return (
        <img id="heart" ref={heartRef}
             src="https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png"
             onClick={handleClick}
             onMouseEnter={handleFocus} style={{width: '50px', height: '50px'}}
             onMouseOut={handleFocus} style={{width: '50px', height: '50px'}}/>
    )
}