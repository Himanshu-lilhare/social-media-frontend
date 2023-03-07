import { createReducer } from "@reduxjs/toolkit";

const initialState={}

export const getChatsOrCreateChats=createReducer(initialState,{
    getChatsRequest:(state)=>{
        state.loading=true
     },
     getChatsSuccess:(state,action)=>{
       state.loading=false
       state.allChats=action.payload.chats
   },
   getChatsFail:(state,action)=>{
       state.loading=false
       state.error=action.payload
   },
   clearError:(state)=>{
    state.error=null
},
accessChatsRequest:(state)=>{
    state.loading=true
 },
 accessChatsSuccess:(state,action)=>{
   state.loading=false
   state.oneChat=action.payload.chat
},
accessChatsFail:(state,action)=>{
   state.loading=false
   state.error=action.payload
},

}) 

export const fetchingAndSendingMessages=createReducer(initialState,{
    getAllMessagesRequest:(state)=>{
 state.loading=true
    },
       getAllMessagesSuccess:(state,action)=>{
        state.loading=false
        state.allMessages=action.payload.messages
         },
        
           getAllMessagesFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
               },
               clearError:(state)=>{
                state.error=null
            },
  sendMessageRequest:(state)=>{
   state.loading=true
  },
  sendMessageSuccess:(state,action)=>{
    state.loading=false
    state.message=action.payload.message
   },
   sendMessageFailure:(state,action)=>{
    state.loading=false
    state.error=action.payload
   },


})