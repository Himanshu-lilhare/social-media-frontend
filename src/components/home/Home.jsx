import "./home.css"
import React from 'react'
import Post from "./Post/Post"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFollowingPost } from "../../redux/actions/postActons"

const Home = () => {
  const dispatch=useDispatch()
  const {posts} = useSelector(state=>state.postReducer)
  useEffect(()=>{
   dispatch(getFollowingPost())
  },[])
  return (
    <div className="home">

        <div className="postwrapper">
           {
           posts &&
            posts.map((ele)=>
            <Post isAccount={false} post={ele} key={ele._id} postid={ele._id} caption={ele.caption}/>)
           }
           
        </div>
        
    </div>
  )
}

export default Home