import React, { useEffect } from "react";
import Post from "../../../components/home/Post/Post";
import "./Profilepost.css";
import { AiFillDelete, AiTwotoneLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useState } from "react";
import PostModal from "./PostModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getMyPosts } from "../../../redux/actions/postActons";
import { loadUser } from "../../../redux/actions/userAction";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import { toast } from "react-hot-toast";
const Profilepost = ({ isAccount, post }) => {
  const [postModal, setPostModal] = useState(false);
 const {deleteLoading,error,message}=useSelector((state)=>state.likePost)
  const dispatch = useDispatch();
  function postmodalToggler() {
    setPostModal(!postModal);
  }
  async function deleteYourPost(id) {
    await dispatch(deletePost(id));
    dispatch(getMyPosts());
    dispatch(loadUser());
  }
  useEffect(() => {
     if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
     }
     if(error){
      toast.error(error)
      dispatch({type:'clearError'})
     }
  
  
  }, [message,error])
  

  return (
    <div className="OnePost">
      <div className="profilePostImage">
        <div className="realPostImage">
          <img src={post?.image.url} alt="" />
          <div
            className="onHover"
            onClick={() => {
              postmodalToggler();
            }}
          >
            <div
              className="onHoverContents"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="content">
                {post?.likes.length}
                <AiTwotoneLike className="onHoverIcons" />
              </span>
              <span className="content">
                {post.comments.length}
                <FaComment className="onHoverIcons" />
              </span>
              <span className="content">
                {
                  deleteLoading ? <ButtonLoader/> :  <AiFillDelete
                  onClick={() => deleteYourPost(post?._id)}
                  className="deletepostIcon"
                />
                }
               
              </span>
            </div>
          </div>
        </div>
      </div>

      {postModal ? (
        <PostModal
          postmodalToggler={postmodalToggler}
          post={post}
          isAccount={isAccount}
        />
      ) : null}
    </div>
  );
};

export default Profilepost;
