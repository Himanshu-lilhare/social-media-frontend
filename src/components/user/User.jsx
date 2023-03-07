import "./user.css"
import React from 'react'

const User = ({postLike,img}) => {
  
   return (
      
    <div className="Person">
    <div className="personImage"><img src={img} alt="likefdf" /></div>
        <div className="personName"><p>{postLike.name}</p></div>
    </div>
           
   )
   
 

}

export default User