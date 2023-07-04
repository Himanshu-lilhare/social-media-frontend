import "./usercomment.css"
import React, { useState } from 'react'
import img from "../../images/profileimage.png"
import { Link } from "react-router-dom"
import { AiOutlineDelete } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { deleteCommentPost, getMyPosts, replyCommentPost,getFollowingPost } from "../../redux/actions/postActons"
const CommentCard = ({postComments,postid,isAccount}) => {
  const [replyOfComment,setReplyOfComment]=useState('')
  const { user } = useSelector((state) => state.userReducer);
  const [visible,setVisible]=useState(false)
  const dispatch=useDispatch()

 
  async function replyComment(commentId){
     await dispatch(replyCommentPost(postid,commentId,replyOfComment))

      isAccount ? dispatch(getMyPosts()) : dispatch(getFollowingPost())
  }
  function Visible(){
   setVisible(!visible)
  }
  return(
  <div className="allComments">
    {
      postComments.length > 0 ?
       postComments.map((comment)=>{
        return  <div className="userCommentDetail">
        <Link to={`/user/${comment.user._id}`} className="commentImg">
          <img src={img} alt="gdfg" />
          <h4>{
           comment.user._id=== user._id ? 'YOU': comment.user.name
            }</h4>
        </Link>
        <div className="userCommentAndDelete">
        <p className="userComment">
          {
            comment.usercomment
          }
        </p>
        {
          visible && <p className="notWorking">
          Delete functionality is Not Working Now

          <button onClick={Visible}>Close</button>
        </p>
        }
      
        {
          isAccount ?  <button ><AiOutlineDelete onClick={Visible}/></button>
          : comment.user._id === user._id ? <button  ><AiOutlineDelete  onClick={Visible}/></button> : null 
        }
       
        </div>
        <div className="replyToComment">

          <div className="allReplies">
           {
            comment.reply.map((reply)=>{
              return <p>{
               reply.replyOwner._id === user._id ? 'YOU' : reply.replyOwner.name
                }  :  {reply.replyComment}  </p>
            })
           }
          </div>
         
          <input onChange={(e)=>setReplyOfComment(e.target.value)} type="text" placeholder="Reply Comment" required />
          <button onClick={()=>replyComment(comment._id)}>Reply</button>

        </div>
        
      </div> 
       })
     : <h3>No Comments Yet</h3>
    }
  </div>
  )
}

export default CommentCard