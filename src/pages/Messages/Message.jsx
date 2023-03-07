
import React, { useState } from 'react'
import Allmessages from './Allmessages/Allmessages'
import './Messages.css'
import SingleChatPg from './singleChatpg/SingleChatPg'

function Message(){
  const [path,setpath]=useState(window.location.pathname)
  
  
  return (
    <div className='message'>
        <Allmessages />
    </div>
  )
}

export default Message