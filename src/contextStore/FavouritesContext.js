import React, {createContext, useState} from "react";

export const FavouritesContext = createContext()

const ContextFavourites = ({children}) => {
    const [favouritesContent, setFavouritesContent] = useState([])

    return (<FavouritesContext.Provider value={{favouritesContent, setFavouritesContent}}>
        {children}
    </FavouritesContext.Provider>)
}
export default ContextFavourites