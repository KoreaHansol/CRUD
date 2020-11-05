import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3061"
axios.defaults.withCredentials = true;
const dummyUser = {
  id: 1,
  userid:'hskimaa',
  nickname: '김한솔',
  Posts: [],
  Followings: [],
  Followers: [],
};

export const initialState = {
  isloging: false,
  isLoggedIn: false,
  user: null,
  loginData: {},
  signUpData: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

export const signUpAction = (data) => {
  return (dispatch) => {
    dispatch(signUpRequestAction());
    axios.post('/user/signup', data)
    .then(() => {
      dispatch(signUpSuccessAction(data));
    })
    .catch(() => {
      dispatch(signUpFailureAction())
    })
  }
}

export const signUpRequestAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};
export const signUpSuccessAction = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    data,
  };
};
export const signUpFailureAction = (data) => {
  return {
    type: SIGN_UP_FAILURE,
    data,
  };
};



export const LoginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
export const LoginSuccessAction = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};
export const LoginFailureAction = (data) => {
  return {
    type: LOG_IN_FAILURE,
    data,
  };
};



export const loginAction = (data) => {
  return (dispatch) => {
    dispatch(LoginRequestAction());
    axios.post('/user/login', data)
    .then((user) => {
      dispatch(LoginSuccessAction(user));
    })
    .catch(() => {
      dispatch(LoginFailureAction())
    })
  }
}

export const logoutAction = {
  type: LOG_OUT,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isloging: true,
      }
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        user: action.data,
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        user: action.data,
        signUpData: action.data,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        user: action.data,
        signUpData: null,
      };
    }
    default: {
      return {
        ...state,
      }
    }
  }
};
