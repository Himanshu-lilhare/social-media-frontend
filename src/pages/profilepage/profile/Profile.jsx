import React, { useState } from "react";
import "./profile.css";

import { FiSettings } from "react-icons/fi";
import Profilepost from "../profilepost/Profilepost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  getMyPosts } from "../../../redux/actions/postActons";

import Modal from "./followerFollowingModal/Modal";

import { logOutUser } from "../../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const {  posts } = useSelector((state) => state.myPosts);
 const [followerModal,setFollowerModal]=useState(false)
 const [followingModal,setFollowingModal]=useState(false)
 
 const navigate= useNavigate()
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
function followerToggler(){
  setFollowerModal(!followerModal)
}
function followingToggler(){
  setFollowingModal(!followingModal)
}

async function logoutHandler(){
  await dispatch(logOutUser())
  navigate('/')
  

}
  return (
  <div className="profilepage">
      <div className="profilewrapper">
        <div className="profileinfo">
          <div className="profileimage">
            <div className="profileimagediv">
              <img src={user.avatar.url} alt="profileimage" />
            </div>
          </div>
          <div className="profiledetails">
            <div className="editprofilediv">
              { user && <h1 style={{ textTransform: "uppercase" }}>{user.name}</h1>}
              <div className="actualeditprofile">
                <button className="editProfile">Edit Profile</button>

                <FiSettings style={{
                  
                  cursor:"not-allowed"
                }} />
              </div>
            </div>
            <div className="followpostinfo">
            { user && <> <button>{user.posts.length} Posts</button>
              <button onClick={followerToggler}>{user.followers.length} Followers</button>
              <button onClick={followingToggler}>{user.following.length} Follwing</button>
              </> }
              <button onClick={logoutHandler}>Log Out</button>
            </div>
            
            <div className="profilename">
             {user && <h2 style={{ fontWeight: "500" }}>{user.email}</h2>}
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
          {posts && posts.length > 0 ? (
            posts.map((ele) => {
              return (
                
                <Profilepost
                  isAccount={true}
                  post={ele}
                  key={ele._id}
                  postid={ele._id}
                />
              );
            })
          ) : (
            <h2>No Posts Yet</h2>
          )}
        </div>
        {/* <div className="FaltuDiv"></div> */}
      </div>
      {
        followerModal && <Modal fToggler={followerToggler} follower={true}/>
      }
      {
        followingModal && <Modal fToggler={followingToggler} follower={false}/>
      }
    </div> 
  );
};

export default Profile;
