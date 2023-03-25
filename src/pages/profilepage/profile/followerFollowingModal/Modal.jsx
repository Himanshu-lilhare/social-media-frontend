import "./modal.css";
import React, {  useState } from "react";
import image from "../../../../images/profileimage.png";
import { useDispatch, useSelector } from "react-redux";
import { BiX } from "react-icons/bi";
import { followUnfollowUser, loadUser } from "../../../../redux/actions/userAction";

const Modal = ({ follower, fToggler }) => {
  const { user } = useSelector((state) => state.userReducer);
 const [follow,setFollow]=useState(false)
 const dispatch=useDispatch()

  async function followUnfollowHandler(id,ab){
    if(ab){
      setFollow(prev=>!prev) 
    }
   

   await dispatch(followUnfollowUser(id))

   dispatch(loadUser())
 }



  return (
    <div className="fModal">
      <div className="fModalContent">
        <div className="fModalHead">
          <p>{follower ? "Followers" : "Followings"}</p>
          <BiX
            onClick={() => {
              fToggler();
            }}
            style={{ fontSize: "29px" }}
          />
        </div>
        <div className="AllF">
          {follower
            ? user.followers &&
              user.followers.map((e) => {
                return (
                  <div key={e._id} className="OneF">
                    <div className="OneFNameImage">
                      <div className="OneFImage">
                        <img src={image} alt="" />
                      </div>
                      <div className="OneFName">
                        <p>{e.name}</p>
                      </div>
                    </div>
                    <div className="OneFFollowUnfollow">
                      <button onClick={()=>followUnfollowHandler(e._id,true)}>
                        {e.followers.includes(user._id)  ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                );
              })
            : user.following &&
              user.following.map((e) => {
                return (
                  <div key={e._id} className="OneF">
                    <div className="OneFNameImage">
                      <div className="OneFImage">
                        <img src={image} alt="" />
                      </div>
                      <div className="OneFName">
                        <p>{e.name}</p>
                      </div>
                    </div>
                    <div className="OneFFollowUnfollow">
                      <button className="followUnfollowButton" onClick={()=>{followUnfollowHandler(e._id)}}>Unfollow</button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
