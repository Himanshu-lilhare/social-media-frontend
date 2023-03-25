import "./commentmodal.css"
import React from 'react'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { CommentPost, getFollowingPost } from "../../../../redux/actions/postActons"
import CommentCard from "../../../commentCard/CommentCard"
import {AiOutlineClose} from 'react-icons/ai'
const CommentModal = ({postComments,setShowComment,showComment,postid,isAccount}) => {
const [comment,setComment]=useState("")
const [close,setClose]=useState(false)
const dispatch=useDispatch()
console.log(postComments)
async function addCommentHandler(e){
     e.preventDefault()
 await dispatch(CommentPost(postid,comment))
  dispatch(getFollowingPost())
}
 return (

  showComment &&
    <div className="Commentmodal" >
            <div className="Commentcontainer" 
            // onClick={()=>{setShowComment(true)}}
            >
                  <div className="Comment-modal-nav" >
                    <p style={{fontSize:"20px",fontWeight:"400"}}>

                    Comments</p>
                 <AiOutlineClose onClick={() => setShowComment(false)} className="closeCommentIcon" style={{fontSize:'18px'}}/>
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