import React from "react";
import "./login.scss";
import mobilepng from "../../images/mobile.png";
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import image1 from "../../images/image1.jfif";
import image2 from "../../images/image2.jfif";
import image3 from "../../images/image3.jfif";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { demoLoginUser, loginUser } from "../../redux/actions/userAction";
import ButtonLoader from "../../components/loader/ButtonLoader";
const Login2 = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();

  const { loading,demoloading } = useSelector((state) => state.userReducer);

  function submithandler(e) {
    e.preventDefault();
    dispatch(loginUser(email, password));
  }
  function loginWithDemo(e){
    e.preventDefault()
    dispatch(demoLoginUser('demoemail@gmail.com', 'demodemo'));
  }

  return (
    <div className="login">
      <div className="card">
        <div
          className="left"
          style={{
            backgroundImage: `url(${mobilepng})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="imagescard">
            <CarouselProvider
              className="slider"
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
              <Slider>
                <Slide index={0}>
                  <Image src={image1} className="image" />
                </Slide>
                <Slide index={1}>
                  <Image src={image2} className="image" />
                </Slide>
                <Slide index={2}>
                  <Image src={image3} className="image" />
                </Slide>
              </Slider>
            </CarouselProvider>
          </div>
        </div>
        <div className="right">
          <div className="wrapper">
            <h2>LogIn</h2>
            <form onSubmit={submithandler}>
              <div className="email">
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  required
                />
              </div>
              <div className="password">
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  placeholder="ENTER YOUR PASSSWORD"
                  required
                />
              </div>
              <button
                style={{
                  width: "76px",
                  marginRight: "10px",
                }}
                type="submit"
              >
                {loading ? <ButtonLoader /> : "LOG IN"}
              </button>
              <span
                style={{
                  fontSize:'1.4rem',
                  marginRight: "10px",
                }}
              >
                OR
              </span>
            
              <button onClick={loginWithDemo}>{
                demoloading ? <ButtonLoader/> : 'Log In With Demo Account'
              }</button>
            </form>
          </div>
          <div className="wrapper2">
            <p>Dont't have an Account ? </p>
            <Link to="/register">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
