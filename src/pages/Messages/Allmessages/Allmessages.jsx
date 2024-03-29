
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getAllChats } from '../../../redux/actions/chatActions'
import Singlemsg from '../singleMSG/Singlemsg'
import './allmessages.css'

function Allmessages(){
  const dispatch=useDispatch()
   const {allChats}= useSelector((state) => state.getChatsOrCreateChats);
   let {allMessages}= useSelector((state) => state.fetchingAndSendingMessages);
   useEffect( ()=>{
    dispatch(getAllChats())
    console.log(allMessages)
  
   },[dispatch])


  return (
    <div className='allmessages'>
      { allChats && allChats.length > 0 ? allChats.map((item,index)=>{
     return (
         <Singlemsg key={index+1} singleChat={item}  />
     )
       }) : <h1>No Messages Yet</h1>
     }
    
     </div> 
     
    
  
  )
}

export default Allmessages