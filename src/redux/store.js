import { configureStore } from "@reduxjs/toolkit";
import { fetchingAndSendingMessages, getChatsOrCreateChats } from "./reducers/chatReducer.js";
import { likePostReducer, myPostsReducer, othersPostsReducer, postReducer } from "./reducers/postReducer";
import { allUserReducer, getOtherUser, userReducer } from "./reducers/userReducer";

export const serverLink = "http://localhost:5000";

export const store=configureStore({
    reducer:{
        userReducer:userReducer,
        postReducer:postReducer,
        allUserReducer:allUserReducer,
        likePost:likePostReducer,
        myPosts:myPostsReducer,
        otherUser:getOtherUser,
        othersPost:othersPostsReducer,
        getChatsOrCreateChats:getChatsOrCreateChats,
        fetchingAndSendingMessages:fetchingAndSendingMessages

    }
})