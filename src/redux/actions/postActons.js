import axios from "axios";

export const getFollowingPost = () => async (dispatch) => {
  try {
    dispatch({ type: "getFollowingpostRequest" });
    const { data } = await axios.get(
      "http://localhost:5000/getFollowingPosts",
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "getFollowingpostSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getFollowingpostFail",
      payload: error.response.data.error,
    });
  }
};

export const likeUnlikePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "likePostRequest" });
    const { data } = await axios.get(`http://localhost:5000/likeUnlike/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: "likePostSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "likePostFail", payload: error.response.data.error });
  }
};

export const CommentPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({ type: "commentPostRequest" });
    const { data } = await axios.put(
      `http://localhost:5000/post/comments/${id}`,
      { comment },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "commentPostSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "commentPostFail", payload: error.response.data.error });
  }
};

export const deleteCommentPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentPostRequest",
    });

    const { data } = await axios.delete(
      `http://localhost:5000/deletecomment/${id}`,
      {
        data: commentId,
      },
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteCommentPostSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentPostFail",
      payload: error.response.data.error,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({ type: " myPostsRequest" });
    const { data } = await axios.get("http://localhost:5000/getmyposts", {
      withCredentials: true,
    });
    dispatch({ type: "myPostsSuccess", payload: data.posts });
  } catch (error) {
    dispatch({ type: "myPostsFail", payload: error.response.data.error });
  }
};

export const getOthersPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: " othersPostsRequest" });
    const { data } = await axios.get(`http://localhost:5000/getotherspost/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: "othersPostsSuccess", payload: data.posts });
  } catch (error) {
    dispatch({ type: "othersPostsFail", payload: error.response.data.error });
  }
};

export const createPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({ type: "createPostRequest" });
    console.log(caption, image);
    const { data } = await axios.post(
      `http://localhost:5000/post/uploadpost`,
      { caption, image },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "createPostSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "createPostFail", payload: error.response.data.error });
  }
};

export const editCaptionPost = (caption, id) => async (dispatch) => {
  try {
    dispatch({ type: " EditPostCaptionRequest" });
    // console.log(caption,image)
    const { data } = await axios.put(
      `http://localhost:5000/editpostcaption/${id}`,
      { caption },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "EditPostCaptionSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "EditPostCaptionFail",
      payload: error.response.data.error,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deletePostRequest" });
    // console.log(caption,image)
    const { data } = await axios.delete(
      `http://localhost:5000/deletepost/${id}`,

      {
        withCredentials: true,
      }
    );
    dispatch({ type: "deletePostSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deletePostFail",
      payload: error.response.data.error,
    });
  }
};
