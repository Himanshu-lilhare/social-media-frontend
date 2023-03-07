import './createpost.css'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../redux/actions/postActons'
import { loadUser } from '../../redux/actions/userAction'
import ButtonLoader from '../loader/ButtonLoader'
const CreatePost = () => {
    const [caption,setCaption]=useState('')
    const [image,setimage]=useState('v')
    const { loading,message,error } = useSelector((state) => state. likePost);
  const dispatch=useDispatch()

    function imageHandler(e){
      const file = e.target.files[0];

      const Reader = new FileReader();
      Reader.readAsDataURL(file);
  
      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setimage(Reader.result);
        }
      };
  }

   async function postCreateHandler(e){
      e.preventDefault()
  
    await dispatch(createPost(caption,image))
   


    await setimage('')
    await setCaption('')
    dispatch(loadUser())
    }

    useEffect(()=>{

      if(error){
        toast.error(error)
      dispatch({type:'clearError'})
        }
      if(message){
          toast.success(message)
       dispatch({type:'clearMessage'})
        }

       
      
    
    },[error,message,dispatch])

  return (
    <div className='createPost'>
        <form onSubmit={postCreateHandler}>
            
 { image &&
  <img src={image} alt="" />
}
  <div className='createPostInputs'>
  <input  type="file" onChange={imageHandler} accept='image/*' />
            <input className='captionInput' type='text' onChange={(e)=>{setCaption(e.target.value)}} value={caption} placeholder='Post Caption'/>
            <button  type='submit' className='createPostButton'>
              Post
              {
                loading &&    <ButtonLoader/>
              }
            
            </button>
            
          </div>
          
        </form>
    </div>
  )
}

export default CreatePost