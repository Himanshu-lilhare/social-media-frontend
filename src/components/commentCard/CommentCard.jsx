import "./usercomment.css"
import React from 'react'
import img from "../../images/profileimage.png"
import { Link } from "react-router-dom"
import { AiOutlineDelete } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { deleteCommentPost } from "../../redux/actions/postActons"
const CommentCard = ({postComments,postid,isAccount}) => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch=useDispatch()

  function deleteCommentHandler(commentId){
      dispatch(deleteCommentPost(postid,commentId))
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
            comment.user.name
            }</h4>
        </Link>
        <div className="userCommentAndDelete">
        <p className="userComment">
          {
            comment.usercomment
          }
        </p>
        {
          isAccount ?  <button onClick={()=>deleteCommentHandler(comment._id)}><AiOutlineDelete/></button>
          : comment.user._id === user._id ? <button onClick={()=>deleteCommentHandler(comment._id)}><AiOutlineDelete/></button> : null 
        }
       
        </div>
        
      </div> 
       })
     : <h3>No Comments Yet</h3>
    }
  </div>
  )
}

export default CommentCard