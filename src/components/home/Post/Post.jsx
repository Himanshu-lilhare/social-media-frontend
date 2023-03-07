import "./post.css";
import React from "react";
import profileimage from "../../../images/profileimage.png";
import postimage from "../../../images/postimage.jpg";
import { FiMoreVertical } from "react-icons/fi";
import {
  AiOutlineLike,
  AiTwotoneLike,
  AiOutlineSave,
  AiFillSave,
  AiOutlineDelete
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  likeUnlikePost,
  getFollowingPost,
  getMyPosts,
  deletePost,
} from "../../../redux/actions/postActons";
import {loadUser} from "../../../redux/actions/userAction"
import { useEffect } from "react";
import LikeModal from "./likesModal/LikeModal";
import CommentModal from "./commentModal/commentModal";
import EditPost from "./editPostModal/EditPost";
const Post = ({ caption, postid, post ,isAccount}) => {
  const description = caption;
  const [isreadmore, setisreadmore] = useState(false);
  const [value, setvalue] = useState("");
  const [like, setlike] = useState(false);
  const [show, setshow] = useState(false);

  const [showComment,setShowComment]=useState(false)
  
  const [showEditCaption,setShowEditCaption]=useState(false)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {

   post.likes && post.likes.map((likeid) => {
      if (likeid._id === user._id) {
        return setlike(true);
      } else {
        return setlike(false);
      }
    });
  }, [post.likes, user._id]);
  async function likehandler() {
    setlike(!like);
    console.log(postid);
    await dispatch(likeUnlikePost(postid));
    isAccount ? dispatch(getMyPosts()) :  dispatch(getFollowingPost())  
    
  }
   function showCommentHandler(){
    setShowComment(true)
    dispatch(getFollowingPost())
}

async function deletePostHandler(){
 await dispatch(deletePost(postid))
 dispatch(getMyPosts())
 dispatch(loadUser())
}
  return (
    <div className="post">

      <div className="topcontent">
        <div className="usernameprofile">
          <img src={profileimage} alt="" />
          <span>Raj Lilhare</span>
        </div>
        <div className="morelogo">
          {
            isAccount &&   <FiMoreVertical onClick={()=>{setShowEditCaption(!showEditCaption)}} />
          }
        
        </div>
      </div>
      <div className="postimage">
        <img src={post.image.url} alt="" />
      </div>
      <div className="allposticons">
        <div className="likecomment">
          <button
            onClick={likehandler}
            style={{
              backgroundColor: "transparent",
              border: "none",
              width: "100%",
              height: "100%",
            }}
          >
            {like ? (
              <AiTwotoneLike style={{ color: "red" }} />
            ) : (
              <AiOutlineLike />
            )}
          </button>
          <BiComment onClick={()=>{
            showCommentHandler()
            }} className="commenticon" />
            {
              isAccount &&  <AiOutlineDelete style={{fontSize:"4rem"}} onClick={deletePostHandler}/>
            }
         
        </div>
        <div className="saveicon">
          <AiOutlineSave />
        </div>
      </div>
      <div className="likedby">
        <p>
          Like by{" "}
          <span
            onClick={() => setshow(true)}
            style={{ fontWeight: "600", cursor: "pointer" }}
          >
            {post.likes.length > 0
              ? `${post.likes[0].name} and ${post.likes.length - 1} others `
              : "Nolikes"}
          </span>
        </p>
      </div>
      <div className="description">
        <p>
          {description.length > description.substring(0, 24).length &&
          !isreadmore
            ? `${description.substring(0, 24)}...`
            : description}
        </p>
        {description.length > description.substring(0, 24).length ? (
          isreadmore ? (
            <button
              onClick={() =>
                isreadmore ? setisreadmore(false) : setisreadmore(true)
              }
            >
              Read Less
            </button>
          ) : (
            <button
              onClick={() =>
                isreadmore ? setisreadmore(false) : setisreadmore(true)
              }
            >
              Read more
            </button>
          )
        ) : (
          ""
        )}
      </div>
      <div className="comment">
        <input
          placeholder="Add a comment..."
          type="text"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
        <button>Post</button>
      </div>

      <LikeModal setshow={setshow} show={show} postLikes={post.likes} />
      {
        showComment ?  <CommentModal isAccount={isAccount} postComments={post.comments} postid={postid} setShowComment={setShowComment} />
         : null
      }
      {
        showEditCaption && <EditPost postid={postid} setShowEditCaption={setShowEditCaption} caption={caption}/>
      }
     
    </div>
  );
};

export default Post;
