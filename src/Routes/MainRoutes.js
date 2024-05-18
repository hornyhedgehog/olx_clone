import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import CreatePost from '../Pages/CreatePost'
import ViewPost from '../Pages/ViewPost'
import ViewMore from '../Pages/ViewMore'
import AccountPage from "../Pages/MyAccount";
import Favourites from "../Pages/Favourites";
import SearchResults from "../Pages/SearchResults";
import ModelViewer from "../Components/ModelViewer/ModelViewer";


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
           <Route path="/create">
               <CreatePost/>
           </Route>
           <Route path="/view">
               <ViewPost/>
           </Route>
           <Route path="/viewmore">
               <ViewMore/>
           </Route>
           <Route path="/results/:filter" component={SearchResults}/>
           <Route path="/testModel" component={ModelViewer}/>

       </Router>
    )
}

export default MainRoutes
