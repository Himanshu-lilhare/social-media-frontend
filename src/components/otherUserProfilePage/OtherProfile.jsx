import "../../pages/profilepage/profile/profile.css";
import React, { useState } from "react";

import { FiSettings } from "react-icons/fi";

import Profilepost from "../../pages/profilepage/profilepost/Profilepost";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Modal from "../../pages/profilepage/profile/followerFollowingModal/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { followUnfollowUser, getOtherUser, loadUser } from "../../redux/actions/userAction";
import { getOthersPosts } from "../../redux/actions/postActons";

const OtherProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.otherUser);
  const {user:me}=useSelector(state=>state.userReducer)
  const [follow,setFollow]=useState(false)
  const { posts} = useSelector((state) => state.othersPost);
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [path,setpath]=useState(window.location.pathname)
 
  const navigate=useNavigate()
  const {id}=useParams()
 
  useEffect(() => {
    dispatch(getOtherUser(id));
    dispatch(getOthersPosts(id))

  
  }, [dispatch,id]);
  useEffect(() => {
   
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollow(true);
        } else {
          setFollow(false);
        }
      });
    }
  }, [user, me._id]);
 console.log(user)
 
  function followerToggler() {
    setFollowerModal(!followerModal);
  }
  function followingToggler() {
    setFollowingModal(!followingModal);
  }
  function createChatHandler(){
  console.log(user._id)
navigate(`/message/chat?userId=${user._id}`)

  }
 
  async function followUnfollowHandler(){
    setFollow(!follow)
    await dispatch(followUnfollowUser(user._id))
    await dispatch(getOtherUser(user._id))
    dispatch(loadUser())
  }
  return (
    <div className="profilepage">
      <div className="profilewrapper">
        <div className="profileinfo">
          <div className="profileimage">
            <div className="profileimagediv">
                {
                   user && user.avatar && user.avatar.url && <img src={user.avatar.url} alt="profileimage" />
                }
             
            </div>
          </div>
          <div className="profiledetails">
            <div className="editprofilediv">
              {user && (
                <h1 style={{ textTransform: "uppercase" }}>{user.name}</h1>
              )}
             
            </div>
            <div className="followpostinfo">
              {user && (
                <>
                  {" "}
                  <button>{user.posts.length} Posts</button>
                  <button onClick={followerToggler}>
                    {user.followers.length} Followers
                  </button>
                  <button onClick={followingToggler}>
                    {user.following.length} Follwing
                  </button>
                  {
                 
                 follow ? <button onClick={followUnfollowHandler}>Unfollow</button> : <button onClick={followUnfollowHandler}>Follow</button>
                 
                  }
                </>
              )}
            </div>
            <button className="profileMessage" onClick={createChatHandler}>Message</button>
            <div className="profilename">
              {user && <h2 style={{ fontWeight: "400" }}>{user.email}</h2>}
            </div>
            <div className="profilebio">
              <p>
                Lorem ipsum, dolo r sit amet consectetur adipi sicing elit.
                Magnam, esse!
              </p>
            </div>
          </div>
        </div>
        <div className="profileposts">
          {  
          posts && posts.length > 0 ? 
            posts.map((ele) => {
              return (
                <Profilepost
                  isAccount={false}
                  post={ele}
                  key={ele._id}
                  postid={ele._id}
                />
              );
            })
           : (
            <h2>No Posts Yet</h2>
          )}
        </div>
        <div className="FaltuDiv"></div>
      </div>
      {followerModal && <Modal fToggler={followerToggler} follower={true} />}
      {followingModal && <Modal fToggler={followingToggler} follower={false} />}
    </div>
  );
};

export default OtherProfile;
