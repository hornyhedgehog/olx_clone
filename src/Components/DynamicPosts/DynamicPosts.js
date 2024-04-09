import React,{useContext} from 'react'
import "./dynamicposts.css"
import {AllPostContext} from "../../contextStore/AllPostContext" ;
import PostCard from '../PostCards/PostCard';
import {Link} from "react-router-dom";

function DynamicPosts({category}) {
    
    const {allPost}=useContext(AllPostContext)
    let displayCards=allPost.filter((itm)=>itm.category===category).map((product,index)=>{return(
      <PostCard product={product} index={index} key={index} />
    )});
    
    return (<>
     { category!=="null" && <div>
            <div className="moreView">
        <div className="heading">
          <span>{category}</span>
         <Link to="./viewmore"> <span>View more</span> </Link>
        </div> 
        <div className="cards">{displayCards}</div>
      </div>
        </div> } 
        </>
   )
}

export default DynamicPosts
