
import { createReducer } from "@reduxjs/toolkit";

const initialState={}

export const postReducer=createReducer(initialState,{
  getFollowingpostRequest:(state)=>{
     state.loading=true
  },
  getFollowingpostSuccess:(state,action)=>{
    state.loading=false
    state.posts=action.payload.posts
},
getFollowingpostFail:(state)=>{
    state.loading=false
    state.error=state.payload
},
clearError:(state)=>{
    state.error=null
}

})

export const likePostReducer=createReducer(initialState,{
     likePostRequest:(state)=>{
       state.loading=true
    },
     likePostSuccess:(state,action)=>{
      state.loading=false

      state.message=action.payload.message
  },
     likePostFail:(state)=>{
      state.loading=false
      state.error=state.payload
  },
  commentPostRequest:(state)=>{
    state.loading=true
 },
  commentPostSuccess:(state,action)=>{
   state.loading=false
   state.message=action.payload.message
},
  commentPostFail:(state)=>{
   state.loading=false
   state.error=state.payload
},
createPostRequest:(state)=>{
  state.loading=true
},
createPostSuccess:(state,action)=>{
 state.loading=false
 state.message=action.payload.message
},
createPostFail:(state,action)=>{
 state.loading=false
 state.error=action.payload
},
deletePostRequest:(state)=>{
  state.loading=true
},
deletePostSuccess:(state,action)=>{
 state.loading=false
 state.message=action.payload.message
},
deletePostFail:(state,action)=>{
 state.loading=false
 state.error=action.payload
},
EditPostCaptionRequest:(state)=>{
  state.loading=true
},
EditPostCaptionSuccess:(state,action)=>{
 state.loading=false
 state.message=action.payload.message
},
EditPostCaptionFail:(state)=>{
 state.loading=false
 state.error=state.payload
},
deleteCommentPostRequest:(state)=>{
  state.loading=true
},
deleteCommentPostSuccess:(state,action)=>{
 state.loading=false
 state.message=action.payload.message
},
deleteCommentPostFail:(state)=>{
 state.loading=false
 state.error=state.payload
},
followUnfollowRequest:(state)=>{
  state.loading=true
},
followUnfollowSuccess:(state,action)=>{
 state.loading=false
 state.message=action.payload.message
},
followUnfollowFail:(state)=>{
 state.loading=false
 state.error=state.payload
},
  clearMessage:(state)=>{
      state.message=null
  }
  ,
  clearError:(state)=>{
      state.error=null
  }
  
  })

  export const myPostsReducer=createReducer(initialState,{
myPostsRequest:(state)=>{
  state.loading=true
},
myPostsSuccess:(state,action)=>{
  state.loading=false
  state.posts=action.payload
},
myPostsFail:(state,action)=>{
  state.loading=false
  state.error=action.payload
},
clearError:(state)=>{
  state.error=null
}

  })
  export const othersPostsReducer=createReducer(initialState,{
    othersPostsRequest:(state)=>{
      state.loading=true
    },
    othersPostsSuccess:(state,action)=>{
      state.loading=false
      state.posts=action.payload
    },
    othersPostsFail:(state,action)=>{
      state.loading=false
      state.error=action.payload
    },
    clearError:(state)=>{
      state.error=null
    }
    
      })