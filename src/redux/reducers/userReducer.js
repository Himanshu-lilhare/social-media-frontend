import { createReducer } from "@reduxjs/toolkit";

const initialState={isAuthenticate:false}

export const userReducer=createReducer(initialState,{

    loginRequest:(state)=>{
        state.loading=true
    
    },
    loginSuccess:(state,action)=>{
        state.loading=false
       
        state.isAuthenticate=true
        state.user=action.payload.user
        state.message=action.payload.message
        
    },
    loginFail:(state,action)=>{
        state.loading=false
    
        state.isAuthenticate=false
        state.error=action.payload
    
    }
    , demologinRequest:(state)=>{
        state.demoloading=true
    
    },
    demologinSuccess:(state,action)=>{
        state.demoloading=false
       
        state.isAuthenticate=true
        state.user=action.payload.user
        state.message=action.payload.message
        
    },
    demologinFail:(state,action)=>{
        state.demoloading=false
    
        state.isAuthenticate=false
        state.error=action.payload
    
    },
    registerRequest:(state)=>{
        state.loading=true
       
    },
    registerSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload.message

    },
    registerFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
      
    },
    loadUserRequest:(state)=>{
        state.loading=true
    },
    loadUserSuccess:(state,action)=>{
        state.loading=false
        state.isAuthenticate=true
        state.user=action.payload.user
     
    },
    loadUserFail:(state,action)=>{
        state.loading=false
        state.isAuthenticate=false
        state.error=action.payload
    },
    logOutUserRequest:(state)=>{
        state.loading=true
    },
    logOutUserSuccess:(state)=>{
        state.loading=false
        state.isAuthenticate=false
        state.user=null
     
    },
    logOutUserFail:(state,action)=>{
        state.loading=false
        state.isAuthenticate=true
        state.error=action.payload
    },
    
    clearMessage:(state)=>{
    state.message=null
},
clearError:(state)=>{
    state.error=null
}

})

export const allUserReducer=createReducer(initialState,{

    searchUsersRequest:(state)=>{
        state.loading=true
    },
    searchUsersSuccess:(state,action)=>{
       state.loading=false
       state.users=action.payload

    },
    searchUsersFail:(state,action)=>{
      state.loading=false 
      state.error=action.payload
    },
    clearError:(state)=>{
        state.error=null
    }

})
export const getOtherUser=createReducer(initialState,{

    otherUserRequest:(state)=>{
        state.loading=true
    },
    otherUserSuccess:(state,action)=>{
        state.loading=false
        state.user=action.payload.user
    },
    otherUserFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    clearError:(state)=>{
        state.error=null
    }
})