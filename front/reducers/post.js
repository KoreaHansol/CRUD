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
    console.log(data)
    return (dispatch) => {
      dispatch(loadPostRequestAction());
      axios.post('/post', data)
      .then((posts) => {
        console.log(posts.data)
        dispatch(loadPostSuccessAction(posts.data));
      })
      .catch(() => {
        dispatch(loadPostRequestAction())
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
          postAdded: true,
        };
      }
      case ADD_POST_SUCCESS: {
        return {
          ...state,
          mainPosts: [action.data, ...state.mainPosts],
          postAdded: true,
        };
      }
      case ADD_POST: {
        return {
          ...state,
          mainPosts: [dummyPost, ...state.mainPosts],
          postAdded: true,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  };
  