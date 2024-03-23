import React,{useContext} from 'react'
import Heart from '../../assets/Heart'
import {useHistory} from "react-router-dom";
import {PostContext} from "../../contextStore/PostContext";
import "./postcards.css"

function PostCards({product,index}) {
    let {setPostContent} = useContext(PostContext)//at the time of onClick on post ,the specified post item assigned to postContent by setPostContent function and it will be stored in a global context PostContext
 
    const history=useHistory()//at the time of onClick on post , we want redirect to the view post page
    const imagePlaceholder = "https://archive.org/download/placeholder-image/placeholder-image.jpg"
    return (
      <div className="card" key={index} onClick={()=>{
        setPostContent(product)
        history.push("/view")
      }}>
          <div className='image-container'>
              <div className="favorite">
                  <Heart></Heart>
              </div>
              <div className="image">
                  <img src={product.url ? product.url : imagePlaceholder} alt=""/>
              </div>
          </div>
          <div className="content">
              <div id='content-left'>
                  <p className="name"> {product.name}</p>
              </div>
              <div id='content-right'>
                  <p className="rate">{product.price}</p>
              </div>
          </div>
      </div>

    )
}

export default PostCards
