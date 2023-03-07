import React from "react";
import Post from "../../../components/home/Post/Post";
import "./Profilepost.css";
import {AiFillDelete, AiTwotoneLike} from 'react-icons/ai'
import {FaComment} from 'react-icons/fa'
import { useState } from "react";
import PostModal from "./PostModal";
const Profilepost = ({ isAccount, post, potsid }) => {

     
  const [postModal,setPostModal]=useState(false)
  function postmodalToggler(){
   setPostModal(!postModal)
  }
  return (
    <div className="OnePost" >
      <div className="profilePostImage">
        <div className="realPostImage">
        <img src={post.image.url} alt=""  /> 
        <div className="onHover" onClick={()=>{postmodalToggler()}}>
          <div className="onHoverContents" onClick={(e)=>e.preventDefault}>
          <span className="content">{post.likes.length}
              <AiTwotoneLike className="onHoverIcons"/>
                </span>
               <span className="content">
                {
                  post.comments.length
                }
                <FaComment className="onHoverIcons"/>

               </span>
               <span className="content">
          <AiFillDelete className="deletepostIcon"/>
               </span>
          </div>
             
               
 
        </div> 
        </div>
       
        
      </div>
 
      {
        postModal ?  <PostModal   postmodalToggler={postmodalToggler} post={post} isAccount={isAccount}/> : null
      }
     
      
    </div>
  );
};

export default Profilepost;
