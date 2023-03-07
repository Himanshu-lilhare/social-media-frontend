import React from 'react'
import { useSelector } from 'react-redux'
import { Link, redirect, useNavigate } from 'react-router-dom'

import "./singlemsg.css"
const Singlemsg = ({singleChat}) => {
  const navigate=useNavigate()
  const { user } = useSelector((state) => state.userReducer);
 return (
    <div  className='singlemsg' onClick={()=>{
      let chat=JSON.stringify(singleChat)
         navigate(`/message/chat?chatId=${singleChat._id}&chat=${chat}&userId=${singleChat.users.filter((User=> user._id !== User._id ))[0]._id}`)
    }}>
      <picture className='singlemsgImgWrapper'>
      <img src={`${singleChat.users[1].avatar.url}`} className='singlemsgimg'/>
      </picture>
       
        <span>{singleChat.chatName}</span>
    </div>
  )
}

export default Singlemsg