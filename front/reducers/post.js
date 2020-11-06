import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3061"
axios.defaults.withCredentials = true;
export const initialState = {

};
  
  const ADD_POST = 'ADD_POST';
  const POST_LOAD = 'POST_LOAD';
  const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
  const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
  const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
  
  const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
  const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';
  const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';

  const LOAD_SINGLE_POST_REQUEST = 'LOAD_SINGLE_POST_REQUEST';
  const LOAD_SINGLE_POST_SUCCESS = 'LOAD_SINGLE_POST_SUCCESS';
  const LOAD_SINGLE_POST_FAILURE = 'LOAD_SINGLE_POST_FAILURE';

  const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
  const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
  const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

  export const addPostRequestAction = (data) => {
    return {
      type: ADD_POST_REQUEST,
      data,
    };
  };
  export const addPostSuccessAction = (data) => {
    return {
      type: ADD_POST_SUCCESS,
      data,
    };
  };
  export const addPostFailureAction = (data) => {
    return {
      type: ADD_POST_FAILURE,
      data,
    };
  };

  export const addPostAction = (data) => {
    return (dispatch) => {
      dispatch(addPostRequestAction());
      axios.post('/post/add', data)
      .then(() => {
        dispatch(addPostSuccessAction(data));
      })
      .catch(() => {
        dispatch(addPostFailureAction())
      })
    }
  };


  export const loadPostRequestAction = (data) => {
    return {
      type: LOAD_POST_REQUEST,
      data,
    };
  };
  export const loadPostSuccessAction = (data) => {
    return {
      type: LOAD_POST_SUCCESS,
      data,
    };
  };
  export const loadPostFailureAction = (data) => {
    return {
      type: LOAD_POST_FAILURE,
      data,
    };
  };
  
  export const loadPostAction = (data) => {
    return (dispatch) => {
      dispatch(loadPostRequestAction());
      axios.post('/post', data)
      .then((posts) => {
        dispatch(loadPostSuccessAction(posts.data));
      })
      .catch(() => {
        dispatch(loadPostRequestAction())
      })
    }
  };


  export const loadsinglePostRequestAction = (data) => {
    return {
      type: LOAD_SINGLE_POST_REQUEST,
      data,
    };
  };
  export const loadsinglePostSuccessAction = (data) => {
    return {
      type: LOAD_SINGLE_POST_SUCCESS,
      data,
    };
  };
  export const loadsinglePostFailureAction = (data) => {
    return {
      type: LOAD_SINGLE_POST_FAILURE,
      data,
    };
  };
  
  export const loadsinglePostAction = (data) => {
    console.log(data)
    return (dispatch) => {
      dispatch(loadsinglePostRequestAction());
      axios.get(`/post/${data.category}/${data.id}`)
      .then((posts) => {
        dispatch(loadsinglePostSuccessAction(posts));
      })
      .catch(() => {
        dispatch(loadsinglePostFailureAction())
      })
    }
  };
  
  export const addCommentRequestAction = (data) => {
    return {
      type: ADD_COMMENT_REQUEST,
      data,
    };
  };
  export const addCommentSuccessAction = (data) => {
    return {
      type: ADD_COMMENT_SUCCESS,
      data,
    };
  };
  export const addCommentFailureAction = (data) => {
    return {
      type: ADD_COMMENT_FAILURE,
      data,
    };
  };
  
  export const addCommentAction = (data) => {
    return (dispatch) => {
      dispatch(addCommentRequestAction());
      axios.post(`/post/${data.id}/comment`, data)
      .then((comment) => {
        dispatch(addCommentSuccessAction(comment.data));
      })
      .catch((err) => {
        console.error(err)
        dispatch(addCommentFailureAction())
      })
    }
  };


  export const postLoaded = {
    type: POST_LOAD,
  }
  
  const dummyPost = {
    id: 2,
    content: '1',
    User: {
      id: 1,
      nickname: '1',
    },
    Images: [],
    Comments: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case LOAD_POST_SUCCESS: {
        return {
          ...state,
          mainPosts: action.data,
        };
      }
      case ADD_POST_SUCCESS: {
        return {
          ...state,
          mainPosts: [action.data, ...state.mainPosts],
          postAdded: true,
        };
      }
      case LOAD_SINGLE_POST_SUCCESS: {
        return {
          ...state,
          singlePost: action.data,
        };
      }
      case ADD_COMMENT_SUCCESS: {
        return { //post
          singlePost: {
            ...state.singlePost,
            data: {
              ...state.singlePost.data,
              Comments: [action.data, ...state.singlePost.data.Comments]
            }
          }
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  };
  