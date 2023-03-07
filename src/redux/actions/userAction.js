import axios from "axios";
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    console.log(email, password);
    const { data } = await axios.post(
      "http://localhost:5000/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.error });
  }
};

export const registerUser =
  (name, email, password, imageUri) => async (dispatch) => {
    try {
      dispatch({ type: "registerRequest" });
      console.log(email, password);
      const { data } = await axios.post(
        "http://localhost:5000/register",
        { name, email, password, imageUri },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch({ type: "registerSuccess", payload: data });
    } catch (error) {
      dispatch({ type: "registerFail", payload: error.response.data.error });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const { data } = await axios.get("http://localhost:5000/getmyprofile", {
      withCredentials: true,
    });
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.error });
  }
};

export const logOutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "logOutUserRequest" });
    const { data } = await axios.get("http://localhost:5000/logout", {
      withCredentials: true,
    });
    dispatch({ type: "logOutUserSuccess" });
  } catch (error) {
    dispatch({ type: "logOutUserFail", payload: error.response.data.error });
  }
};

export const searchUser =
  (search = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "searchUsersRequest" });
      const { data } = await axios.get(
        `http://localhost:5000/search?username=${search}`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "searchUsersSuccess", payload: data.users });
    } catch (error) {
      dispatch({ type: "searchUsersFail", payload: error.response.data.error });
    }
  };

export const getOtherUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "otherUserRequest" });
    const { data } = await axios.get(
      `http://localhost:5000/getotheruser/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "otherUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "otherUserFail", payload: error.response.data.error });
  }
};

export const followUnfollowUser = (id) => async (dispatch) => {
  try {
   


    dispatch({ type: "followUnfollowRequest" });
    const { data } = await axios.get(
      `http://localhost:5000/followUnfollow/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "followUnfollowSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "followUnfollowFail", payload: error.response.data.error });
  }
};
