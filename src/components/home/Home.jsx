import "./home.css"
import React, {lazy, Suspense} from 'react'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFollowingPost } from "../../redux/actions/postActons"
const Post = lazy(()=>import('./Post/Post'))
const Home = () => {

  const dispatch=useDispatch()
  const {posts} = useSelector(state=>state.postReducer)

  useEffect(()=>{
   dispatch(getFollowingPost())
  },[])
  return (
    <div className="home">

        <div className="postwrapper">
        <Suspense fallback={<div>Loading</div>}>
           {
          posts && posts.length > 0 ?
            posts.map((ele)=>
            
            <Post id={ele._id} isAccount={false} post={ele} key={ele._id} postid={ele._id} caption={ele.caption}/>
           
            ) : <h3 className="noPosts">No Posts yet..</h3>
           }
          </Suspense>
        </div>
        
    </div>
  )
}

export default Home