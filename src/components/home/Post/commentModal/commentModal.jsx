import "./commentmodal.css"
import React from 'react'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { CommentPost } from "../../../../redux/actions/postActons"
import CommentCard from "../../../commentCard/CommentCard"

const CommentModal = ({postComments,setShowComment,postid,isAccount}) => {
const [comment,setComment]=useState("")
const dispatch=useDispatch()
// const {}
function addCommentHandler(e){
     e.preventDefault()
  dispatch(CommentPost(postid,comment))
}
 return (
    <div className="Commentmodal" >
            <div className="Commentcontainer" onClick={()=>{setShowComment(true)}}>
                  <div className="Comment-modal-nav" >
                    <p style={{fontSize:"20px",fontWeight:"400"}}>
                    Comments</p>
                  </div>
                 <form onSubmit={addCommentHandler} className="comment-form" >
                    <input placeholder="Add Comment" type="text" value={comment} onChange={(e)=>{setComment(e.target.value)}} />
             <button type="submit">Add</button>
                 </form>
            <div className="previouscomment">
                <h3>
                    Previous All Comments
                </h3>
            </div>
            <CommentCard isAccount={isAccount} postComments={postComments} postid={postid}/>
         </div>
       </div>
      )
    }

export default CommentModal