import "./modal.css";
import React from "react";
import image from "../../../../images/profileimage.png";
import { useSelector } from "react-redux";
import {BiX} from "react-icons/bi"
const Modal = ({ follower,fToggler }) => {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div className="fModal">
      <div className="fModalContent">
        <div className="fModalHead">
          <p>{follower? 'Followers' : 'Followings'}</p>
          <BiX onClick={()=>{fToggler()}} style={{fontSize:'29px'}}/>
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
                      {follower ? (
                        <>
                          {" "}
                          <button>Follow</button> <button>Unfollow</button>
                        </>
                      ) : (
                        <button>Unfollow</button>
                      )}
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
                     
                        <button className="followUnfollowButton">Unfollow</button>
                      
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
