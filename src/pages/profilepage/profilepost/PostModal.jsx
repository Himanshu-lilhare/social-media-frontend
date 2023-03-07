import "./Profilepost.css"
import React from 'react'
import Post from "../../../components/home/Post/Post"
import {GiTireIronCross} from "react-icons/gi"

const PostModal = ({post,isAccount,postmodalToggler}) => {


  return (
    <div className="ProfilePostModal">
      <GiTireIronCross
      onClick={()=>{
    postmodalToggler()
      }}
      style={{
        position:"absolute",
        top:"2rem",
        right:'4rem',
        fontSize:"30px",
        color:'white'
      }}
      />
        <Post caption={post.caption} post={post} postid={post._id} isAccount={isAccount} />
    </div>
  )
}

export default PostModal