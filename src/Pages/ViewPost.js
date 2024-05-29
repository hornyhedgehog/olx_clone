import React from 'react'

import Header from '../Components/Header/Header'
import ViewComponent from '../Components/View/ViewComponent'
import Chat from "../Components/Chat/Chat";


function ViewPost(props) {
    return (
        <div>
            
            <Header />
            <ViewComponent/>
            <Chat/>
            
        </div>
    )
}

export default ViewPost
