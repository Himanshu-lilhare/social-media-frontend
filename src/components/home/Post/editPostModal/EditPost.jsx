import "./editpost.css"
import React, { useState } from 'react'
import {BiX} from "react-icons/bi"
import { useDispatch } from "react-redux"
import { editCaptionPost, getMyPosts } from "../../../../redux/actions/postActons"
const EditPost = ({caption,setShowEditCaption,postid}) => {
  const [editCaption,setEditCaption]=useState(caption)
const dispatch=useDispatch()
 async function editCaptionHandler(e){
 e.preventDefault()
await dispatch(editCaptionPost(editCaption,postid))
  dispatch(getMyPosts())
  }
  return (
    <div className="editPost">
        <form action="" className="editPostForm" onSubmit={editCaptionHandler}>
            <div className="editCaptionHead">
                 <BiX style={{fontSize:'40px',}} onClick={()=>setShowEditCaption(false)}/>
            </div>
            <div className="editCaption">
              <input type="text" value={editCaption} onChange={(e)=>{setEditCaption(e.target.value)}}/>
              <button type="submit" className="editCaptionButton">Edit Caption</button>
            </div>
        </form>
    </div>
  )
}

export default EditPost