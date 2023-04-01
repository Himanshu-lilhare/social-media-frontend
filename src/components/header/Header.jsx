import "./header.css";

import React from "react";
import { AiOutlineHome, AiFillHome, AiOutlineSearch, AiTwotoneMessage } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { RiAccountCircleLine, RiAccountCircleFill } from "react-icons/ri";
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
const Header = () => {
  const [remainingtab, setremainingtab] = useState("");
  const [tab, settab] = useState(window.location.pathname);
  
  

 const location=useLocation()

  return (   
  
// !location.pathname === '/message'  &&
  
  <div className="header">
      <div className='logo' style={{}}>
        <h1 className="MainHead">FIT COMMUNITY</h1>
      </div>
      <div className="menulogoandname">
      <Link style={{ textDecoration: "none", color: "black" }} to="/">
        <div
          className="homelogo menulogos"
          onClick={() => {
            settab("/");
          }}
        >
          <span className="logos">
            {tab === "/" ? <AiFillHome /> : <AiOutlineHome />}
          </span>
        <span className="singlelogo">Home</span>
         
        </div>
        </Link>
        
                 <Link style={{ textDecoration: "none", color: "black" }} to="/message">
          <div className="profilelogo menulogos" onClick={() => {
                settab("/message");
              }}>
            <span className="logos">
              {tab === "/message" ? (
                <AiTwotoneMessage/>
              ) : (
                <FiMessageCircle/>
              )}
            </span>
            <span className="singlelogo">
              Messages
            </span>
          </div>
        </Link>
       

        <Link style={{ textDecoration: "none", color: "black" }} to="/search">
        <div className="searclogo menulogos" onClick={()=>{settab("/search")}}>
          <span className="logos">
            {tab === "/search" ? <FaSearch /> : <AiOutlineSearch />}
          </span>
          <span
            className="singlelogo"
            onClick={() => setremainingtab("search")}
          >
            Search
          </span>
        </div>
        </Link>
     
        <Link style={{ textDecoration: "none", color: "black" }} to="/createpost">
        <div className="addpostlogo menulogos" onClick={()=>{
          settab("/createpost")
        }}>
          <span className="logos">
            {
              tab==="/createpost" ? <IoIosAddCircle/>:<IoIosAddCircleOutline/>
            }
           
          </span>
          <span className="singlelogo">Create Post</span>
        </div>
        </Link>
      
        <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
          <div className="profilelogo menulogos" onClick={() => {
                settab("/profile");
              }}>
            <span className="logos">
              {tab === "/profile" ? (
                <RiAccountCircleFill />
              ) : (
                <RiAccountCircleLine />
              )}
            </span>
            <span className="singlelogo">
              Profile
            </span>
          </div>
        </Link>
       
      </div>

      <div className="username">
        <p>Raj Lilhare</p>
      </div>
    </div>
  )
              
 
           
};

export default Header;
