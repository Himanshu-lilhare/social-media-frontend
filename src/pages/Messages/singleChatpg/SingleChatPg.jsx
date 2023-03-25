import "./singlechtpg.css";
import React, { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  accessChat,
  getAllMessages,
  sendMessageBaby,
} from "../../../redux/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { io } from "socket.io-client";
function SingleChatPg() {
  let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 23, 4];

  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const { oneChat } = useSelector((state) => state.getChatsOrCreateChats);
  const { user } = useSelector((state) => state.userReducer);
  const { allMessages } = useSelector(
    (state) => state.fetchingAndSendingMessages
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [userId, setUserId] = useState(searchParams.get("userId"));
  const socket = useRef();

  console.log(allMessages);
  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.on("getMessage", (data) => {
     
      dispatch(getAllMessages(searchParams.get("chatId")));
      
    });
    
    socket.current.on("setIsTypingTrue", () => {
     setIsTyping(true);
    });

    socket.current.on('setIsTypingFalse',()=>{
      setIsTyping(false)
    })
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);

    socket.current.on("getUsersOnline", (users) => {});

    return () => {
      socket?.current.emit("disconnected");
    };
  }, [user]);

  useEffect(() => {
    dispatch(
      accessChat(searchParams.get("chatId"), searchParams.get("userId"))
    );
    dispatch(getAllMessages(searchParams.get("chatId")));
  }, [dispatch]);

  function handleTyping(e) {
    setMessage(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.current.emit("typing", {
        receiverId: giveReceiverId(),
      });
    }

    let lastTyping=new Date().getTime()

    setTimeout(() => {
      var timeNow=new Date().getTime()
      var timeDiff=timeNow-lastTyping
      if(timeDiff >= 3000 && typing){
        setTyping(false)
        socket.current.emit('stoptyping',{
          receiverId:giveReceiverId()
        })
      }
    },3000);
    // setTimeout(() => {
    //   setTyping(false);
    // }, 500);
  }
  function giveReceiverId() {
    const receiverId = oneChat?.users.find(
      (receiver) => receiver._id !== user._id
    )._id;
    return receiverId;
  }

  async function sendMessage() {
    await dispatch(sendMessageBaby(searchParams.get("chatId"), message));

    socket.current.emit("sendmessage", {
      senderId: user._id,
      receiverId: giveReceiverId(),
      message,
    });

    dispatch(getAllMessages(searchParams.get("chatId")));
  }

  return (
    <div className="singleChat">
     
      <header className="chatHead">
      {isTyping && <p className="typingIndicator">Typing...</p>}
        <BiArrowBack className="backArrow" />
        <Link to={`/profile/${userId}`} className="chatImg">
          <img src={"/login.png"} alt="chtaImg" />
        </Link>
      </header>
      <div className="chatDiv">
        {allMessages &&
          allMessages.map((message, index) => {
            return (
              message && (
                <div
                  key={index}
                  style={{
                    marginLeft:
                      user._id === message.sender._id ? "auto" : "2px",

                    backgroundColor:
                      user._id === message.sender._id ? "#54A300" : "white",
                    color: user._id === message.sender._id && "white",
                    marginBottom: "5px",
                  }}
                  className="oneChatDiv"
                >
                  <p>{message.content}</p>
                </div>
              )
            );
          })}
      </div>
      <textarea
        style={{ height: "40px" }}
        value={message}
        type="text"
        className="typeMessage"
        placeholder="Type Your Message"
        onChange={handleTyping}
      />
      <IoMdSend
        onClick={sendMessage}
        className="sendMessage"
        style={{ position: "absolute", bottom: "3px", right: "14px" }}
      />
    </div>
  );
}
export default SingleChatPg;
