import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Login2 from "./pages/login2/Login";
import Register from "./pages/register/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";

const Header = lazy(() => import("./components/header/Header"));
const Home = lazy(() => import("./components/home/Home"));
const Profile = lazy(() => import("./pages/profilepage/profile/Profile"));
const CreatePost = lazy(() => import("./components/createPost/CreatePost"));
const SearchUser = lazy(() => import("./components/searchUser/SearchUser"));
const OtherProfile = lazy(() =>
  import("./components/otherUserProfilePage/OtherProfile")
);
const Message = lazy(() => import("./pages/Messages/Message"));
const SingleChatPg = lazy(() =>
  import("./pages/Messages/singleChatpg/SingleChatPg")
);

const App = () => {
  const { isAuthenticate,message,error } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    error && dispatch({ type: "clearError" });
    message && dispatch({ type: "clearMessage" });
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<div>loading</div>}>
        <div className="app">
          {isAuthenticate && <Header />}
          <Routes>
            <Route
              path="/"
              element={isAuthenticate ? <Home /> : <Login2 />}
            ></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/message"
              element={isAuthenticate ? <Message /> : <Login2 />}
            ></Route>
            <Route
              path="/profile"
              element={isAuthenticate ? <Profile /> : <Login2 />}
            ></Route>
            <Route
              path="/createpost"
              element={isAuthenticate ? <CreatePost /> : <Login2 />}
            ></Route>
            <Route
              path="/search"
              element={isAuthenticate ? <SearchUser /> : <Login2 />}
            ></Route>
            <Route path="/profile/:id" element={<OtherProfile />}></Route>
            <Route
              path="/message/chat"
              element={isAuthenticate ? <SingleChatPg /> : <Login2 />}
            ></Route>
          </Routes>
        </div>
        <Toaster />
      </Suspense>
    </Router>
  );
};

export default App;
