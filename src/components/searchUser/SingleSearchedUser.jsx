import "./searchuser.css"

import React from 'react'
import { Link } from "react-router-dom"

const SingleSearchedUser = ({user}) => {
  return (
   <Link to={`/profile/${user._id}`} className='searchUserLink'>
    {
        user.avatar &&  <img className="searchedUserImage" src={user.avatar.url} alt="" />
    }
   
    <p className="searchedUserName">{user.name}</p>
   </Link>
  )
}

export default SingleSearchedUser