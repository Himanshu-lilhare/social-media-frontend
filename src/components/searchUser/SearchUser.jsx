import "./searchuser.css"
import React from 'react'
import SingleSearchedUser from "./SingleSearchedUser"
import { useState } from "react"
import { searchUser } from "../../redux/actions/userAction"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const SearchUser = () => {
  const [search,setSearch]=useState('')
const dispatch=useDispatch()
const {users}=useSelector(state=>state.allUserReducer)
  function searchUserHandler(e){
    setSearch(e.target.value)
   
  }
  useEffect(()=>{
    dispatch(searchUser(search))
  },[dispatch,search])

  return (
    <div className="search">
      <div className="searchUserDiv">
      <input placeholder="Search User" value={search} onChange={searchUserHandler} type="text" className="searchUserInput" />
      {
        users ? users.map(user=>{
          return <SingleSearchedUser key={user._id} user={user}/>
        }) : <></>

      }
      </div>
    </div>
  )
}

export default SearchUser
