import "./likemodal.css"
import React from 'react'
import { useEffect } from "react"
import image from "../../../../images/profileimage.png"
import User from "../../../user/User"
const LikeModal = ({show,setshow,postLikes}) => {

if(!show){
        return null
    }
  
  return (
          
    <div className="modal" onClick={()=>setshow(false)} >
        <div className="container">
              <div className="modal-nav" >
                <p style={{fontSize:"20px",fontWeight:"400"}}>Likes</p>
              </div>

              <div className="Alllikes">
                {
               postLikes.length > 0 ?   postLikes.map((e)=>{
              return  <User postLike={e} img={image}/>  

                  }) : <h2 style={{marginTop:"50px"}}>Nolikes</h2> 

                }
               
              </div>
        </div>
    </div>
  )
}

export default LikeModal