import "./singlechtpg.css";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { accessChat, getAllMessages, sendMessageBaby } from "../../../redux/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import {IoMdSend} from  "react-icons/io";
import { io } from "socket.io-client";
function SingleChatPg() {
  let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 23, 4];

  
  const [message,setMessage]=useState('')
  const dispatch = useDispatch();
  const params = useParams();
  const { oneChat } = useSelector((state) => state.getChatsOrCreateChats);
  const { user } = useSelector((state) => state.userReducer);
  const { error,allMessages } = useSelector((state) => state.fetchingAndSendingMessages);
  const [searchParams, setSearchParams] = useSearchParams();
  const [userId,setUserId]=useState(searchParams.get('userId'))
  const [socketConnected,setSocketConnected]=useState(false)
  var socket,selectedChatComp,selectedChat;


     

  useEffect(()=>{
    const ENDPOINT='http://localhost:5000'
  socket=io(ENDPOINT)
 socket.emit('setUp',user)
 socket.on('connected',()=>{
  setSocketConnected(true)
 
 },[])

//  eturn ()=>{
//   socket.disconnect()
//  }r
})

useEffect(()=>{
    dispatch(
      accessChat(searchParams.get("chatId"), searchParams.get("userId"))
    );
    dispatch(getAllMessages(searchParams.get('chatId')))

    socket.emit('joinchat',searchParams.get('chatId'))
    selectedChat=JSON.parse(searchParams.get('chat'))
    selectedChatComp=selectedChat
}, [dispatch,selectedChat]);

 

useEffect(()=>{
  socket.on('messagereceived',(newMessageReceived)=>{
    if(!selectedChatComp || selectedChatComp._id !== newMessageReceived.chat._id ){
      // notification
    }else{
      dispatch(getAllMessages(searchParams.get('chatId')))
     console.log(allMessages)
    
    }
  })
 })


  


 
 
  
  async function sendMessage(){
   await dispatch(sendMessageBaby(searchParams.get("chatId"),message,socket))
   await dispatch(getAllMessages(searchParams.get("chatId")))
 
    // if(error){
    //   console.log(error)
    // }
    
  }
  return (
    <div className="singleChat">
      <header className="chatHead">
        <BiArrowBack className="backArrow"  />
        <Link to={`/profile/${userId}`}  className="chatImg">
          <img src={"/login.png"} alt="chtaImg" />
        </Link>
      </header>
      <div className="chatDiv">
        { allMessages && allMessages.map((message, index) => {
          return (
           message &&  <div
               style={{
                marginLeft:user._id===message.sender._id ?'auto':'2px',
                
                backgroundColor: user._id===message.sender._id ? "#54A300" : "white",
                 color: user._id===message.sender._id && "white",
                marginBottom: "5px",
              }}
              className="oneChatDiv"
            >
              <p>{message.content}</p>
            </div>
          );
        })}
      </div>
      <textarea
      style={{height:'40px'}}
        value={message}
        type="text"
        className="typeMessage"
        placeholder="Type Your Message"
        onChange={(e)=>{setMessage(e.target.value)}}

      />
      <IoMdSend onClick={sendMessage} className="sendMessage" style={{position:"absolute",
    bottom:'3px',right:"14px"
    }}/>
    </div>
  );
}
export default SingleChatPg;
