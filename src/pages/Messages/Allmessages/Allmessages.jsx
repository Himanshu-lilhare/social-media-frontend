
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
      { allChats && allChats.map((item,index)=>{
     return (
         <Singlemsg key={index+1} singleChat={item}  />
     )
       })
     }
     {/* <button onClick={callChat}>button</button> */}
     </div> 
     
    
  
  )
}

export default Allmessages