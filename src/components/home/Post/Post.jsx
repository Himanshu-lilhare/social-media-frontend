import "./post.css";
import React from "react";
import profileimage from "../../../images/profileimage.png";

import { FiMoreVertical } from "react-icons/fi";
import {
  AiOutlineLike,
  AiTwotoneLike,
  AiOutlineSave,
  AiFillSave,
  AiOutlineDelete,
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
import { loadUser } from "../../../redux/actions/userAction";
import { useEffect } from "react";
import LikeModal from "./likesModal/LikeModal";
import CommentModal from "./commentModal/commentModal";
import EditPost from "./editPostModal/EditPost";
import ButtonLoader from "../../loader/ButtonLoader";
import { toast } from "react-hot-toast";
const Post = ({ caption, postid, post, isAccount }) => {
  const description = caption;
  const [isreadmore, setisreadmore] = useState(false);
  const [value, setvalue] = useState("");
  const [like, setlike] = useState(false);
  const [show, setshow] = useState(false);
  const [loaded,setLoaded]=useState(false)
  const [showComment, setShowComment] = useState(false);

  const [showEditCaption, setShowEditCaption] = useState(false);
  const dispatch = useDispatch();
  const {deleteLoading,error,message}=useSelector((state)=>state.likePost)
  const { user } = useSelector((state) => state.userReducer);

  const options={
    rootMargin:'50px 0px 0px 0px',
    threshold:0
  }
 
  useEffect(() => {
  let observer=new window.IntersectionObserver(function(entries,self){
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        loadImages(entry.target)
        self.unobserve(entry.target)
      }
    })
  },options) 
const images=document.querySelectorAll('[data-src]')
images.forEach(img=>{
  observer.observe(img)
})

return ()=>{
  images.forEach(img=>{
observer.unobserve(img)
  })
}
  }, []);

  useEffect(() => {
     console.log('chala')
 post.likes.forEach(like=>{
  if(like._id===user._id.toString()){
    setlike(true)
  }else(
    setlike(false)
  )
 })

      // if(message){
      //   toast.success(message)
      //   dispatch({type:'clearMessage'})
      //  }
      //  if(error){
      //   toast.error(error)
      //   dispatch({type:'clearError'})
      //  }
  }, [post.likes,user._id]);





 function loadImages(targetImage){
  targetImage.src=targetImage.dataset.src
   
 }

   async function likehandler() {
    await dispatch(likeUnlikePost(postid));
 
  setlike(!like)
    
  
    // dispatch(getFollowingPost())
    isAccount ? dispatch(getMyPosts()) : dispatch(getFollowingPost());
  }
  function showCommentHandler() {
    setShowComment(true);
    dispatch(getFollowingPost());
  }

  async function deletePostHandler() {
    await dispatch(deletePost(postid));
    dispatch(getMyPosts());
    dispatch(loadUser());
  }
  return (
    <div onClick={(e)=>e.stopPropagation()} className={`post ${isAccount && 'forProfilePost'}`}>
      <div className="topcontent">
        <div className="usernameprofile">
          <img src={post.owner.avatar?.url} alt="" />
          <span>{post.owner.name}</span>
        </div>
        <div className="morelogo">
          {isAccount && (
            
            <FiMoreVertical
              onClick={() => {
                setShowEditCaption(!showEditCaption);
              }}
            />
          )}
        </div>
      </div>
      <div className={`postimage ${isAccount && 'forProfilePostImage'}`}>
        <img className={loaded ? 'loaded' : 'loading'} onLoad={()=>setLoaded(true)} src='' data-src={post.image.url} alt="" />
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
            {  like ? (
              <AiTwotoneLike style={{ color: "red" }} />
            ) : (
              <AiOutlineLike />
            )}
          </button>
          <BiComment
            onClick={() => {
              showCommentHandler();
            }}
            className="commenticon"
          />
          {isAccount && (
deleteLoading ? <ButtonLoader/> :
            <AiOutlineDelete
              style={{ fontSize: "4rem" }}
              onClick={deletePostHandler}
            />
          )}
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
              ? post.likes[0]?.name === user?.name ? ` You and ${post.likes.length-1} others` :`${post.likes[0].name} and ${post.likes.length - 1} others `
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

      <CommentModal
        showComment={showComment}
        isAccount={isAccount}
        postComments={post.comments}
        postid={postid}
        setShowComment={setShowComment}
      />

      {showEditCaption && (
        <EditPost
          postid={postid}
          setShowEditCaption={setShowEditCaption}
          caption={caption}
        />
      )}
    </div>
  );
};

export default Post;
