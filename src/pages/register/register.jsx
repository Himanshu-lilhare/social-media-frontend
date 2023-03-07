import React from 'react'
import "./register.scss"
import mobilepng from "../../images/mobile.png"
import { CarouselProvider, Slider, Slide, Image,ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import image1 from "../../images/image1.jfif"
import image2 from "../../images/image2.jfif"
import image3 from "../../images/image3.jfif"
import profileimage from "../../images/profileimage.png"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/userAction';

const Register = () => {

  const [imageUri,setImageUri]=useState(profileimage)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const dispatch=useDispatch()
  function registerImageHandler(e){
    const file=e.target.files[0]

    const reader=new FileReader()
     reader.readAsDataURL(file)

     reader.onload=()=>{
      if(reader.readyState===2){
        console.log(reader.result)
        setImageUri(reader.result)
      }
     }
  }

  function registerUserHandler(){
    dispatch(registerUser(name,email,password,imageUri))
  }
  return (
    <div className='register' >
  <div className="card">
  <div className="right">
     <div className="wrapper">
       {
        imageUri && <div className='registerImageDiv'><img src={imageUri} alt="registerImage" /></div>
       }
      <div className="name">
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='ENTER YOUR Name'  required />
      </div>
      <div className="email">
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='ENTER YOUR EMAIL'  required />
      </div>
      <div className="password">
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='ENTER YOUR PASSSWORD'  required/>
      </div>
      <div className="profilePictureInput">
        <input type="file"  onChange={registerImageHandler}/>
      </div>
      <button onClick={registerUserHandler}>REGISTER</button>
     </div>
     <dvi className="wrapper2">
        <p>Already have an Account ? </p>
        <Link to="/"><button>Log In</button></Link>
      
    </dvi>
    </div>
    <div className="left" style={{backgroundImage:`url(${mobilepng})`,backgroundSize:"cover",backgroundPosition:"center"}}>
   
     <div className="imagescard">
     <CarouselProvider 
     className='slider'
        naturalSlideWidth={241}
        naturalSlideHeight={489}
        visibleSlides={1}
        isIntrinsicHeight={false}
        isPlaying={true}
        infinite={true}
        dragEnabled={false}
        touchEnabled={false}
        totalSlides={3}
      >
        <Slider >
          <Slide  index={0}><Image src={image1} className="image"/></Slide>
          <Slide index={1}><Image src={image2} className="image"/></Slide>
          <Slide index={2}><Image src={image3} className="image"/></Slide>
        </Slider>
      </CarouselProvider>
     </div>
 
    </div>

  
  </div>
    </div>
  )
}

export default Register