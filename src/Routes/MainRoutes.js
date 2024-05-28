import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import CreatePost from '../Pages/CreatePost'
import sPage from '../Pages/Ganers'
import ViewPost from '../Pages/ViewPost'
import ViewMore from '../Pages/ViewMore'
import AccountPage from "../Pages/MyAccount";
import Favourites from "../Pages/Favourites";
import SearchResults from "../Pages/SearchResults";
import ModelViewer from "../Components/ModelViewer/ModelViewer";
import GanersPage from "../Pages/Ganers";
import Chat from "../Components/Chat/Chat";


function MainRoutes() {
    return (
       <Router>
           <Route exact path="/">
               <Home/>
           </Route>
           <Route path="/account">
                <AccountPage/>
           </Route>
           <Route path="/favourites">
                <Favourites/>
           </Route>
           <Route path="/signup">
               <Signup/>
           </Route>
           <Route path="/login">
               <Login/>
           </Route>
           <Route path="/createPost">
               <CreatePost/>
           </Route>
           <Route path="/ganers/:ganerHash" component={GanersPage} />
           <Route path="/view">
               <ViewPost/>
           </Route>
           <Route path="/viewmore">
               <ViewMore/>
           </Route>
           <Route path="/results/:filter" component={SearchResults}/>
           <Route path="/chat" component={Chat}/>

       </Router>
    )
}

export default MainRoutes
