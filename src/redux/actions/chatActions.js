import axios from "axios";



export const getAllChats = () => async (dispatch) => {
  try {
    dispatch({ type: "getChatsRequest" });
    const { data } = await axios.get("http://localhost:5000/fetchchats", {
      withCredentials: true,
    });
    dispatch({ type: "getChatsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getChatsFail",
      payload: error.response.data.error,
    });
  }
};

export const accessChat = (chatId, userId) => async (dispatch) => {
  try {
    dispatch({ type: "accessChatsRequest" });
   
    const { data } = await axios.post(
      `http://localhost:5000/chat`,
      {
        chatId,
        userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      }
    );
   
    dispatch({ type: "accessChatsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "accessChatsFail",
      payload: error.response.data.error,
    });
  }
};

export const sendMessageBaby = (chatId,content,socket) => async (dispatch) => {
  try {
    dispatch({ type: "sendMessageRequest" });

    let { data } = await axios.post(`http://localhost:5000/sendmessage`,{
      chatId,
      content
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    socket.emit('newmessage',data.message)

    dispatch({ type: "sendMessageSuccess", payload: data });
 
   
  } catch (error) {
    dispatch({
      type: "sendMessageFailure",
      payload: error.response.data.error,
    });
  }
};
export const getAllMessages = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllMessagesRequest" });

    const { data } = await axios.get(`http://localhost:5000/fetchallmessages/${chatId}`, {
      withCredentials: true,
    });
    
    
    dispatch({ type: "getAllMessagesSuccess", payload: data });
  
   
  } catch (error) {
    dispatch({
      type: "getAllMessagesFailure",
      payload: error.response.data.error,
    });
  }
};
