import axios from 'axios'

axios.defaults.baseURL = 'http://api.k-hansol.com/';
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
  signupError: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const NICK_CHANGE_REQUEST = 'NICK_CHANGE_REQUEST';
export const NICK_CHANGE_SUCCESS = 'NICK_CHANGE_SUCCESS';
export const NICK_CHANGE_FAILURE = 'NICK_CHANGE_FAILURE';



export const nicknameChangeAction = (data) => {
  return (dispatch) => {
    dispatch(nicknameChangeRequestAction());
    axios.post('/user/nickchange', data)
    .then(() => {
      dispatch(nicknameChangeSuccessAction(data.nickname));
      dispatch(loadUserAction());
    })
    .catch(() => {
      dispatch(nicknameChangeFailureAction())
    })
  }
}

export const nicknameChangeRequestAction = (data) => {
  return {
    type: NICK_CHANGE_REQUEST,
    data,
  };
};
export const nicknameChangeSuccessAction = (data) => {
  return {
    type: NICK_CHANGE_SUCCESS,
    data,
  };
};
export const nicknameChangeFailureAction = (data) => {
  return {
    type: NICK_CHANGE_FAILURE,
    data,
  };
};



export const signUpAction = (data) => {
  return (dispatch) => {
    dispatch(signUpRequestAction());
    axios.post('/user/signup', data)
    .then(() => {
      dispatch(signUpSuccessAction(data));
    })
    .catch((err) => {
      dispatch(signUpFailureAction(err.response.data))
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
export const signUpFailureAction = (err) => {
  return {
    type: SIGN_UP_FAILURE,
    err,
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
export const LoginFailureAction = (err) => {
  return {
    type: LOG_IN_FAILURE,
    err,
  };
};

export const LoadUserRequestAction = (data) => {
  return {
    type: LOAD_USER_REQUEST,
    data,
  };
};
export const LoadUserSuccessAction = (data) => {
  return {
    type: LOAD_USER_SUCCESS,
    data,
  };
};
export const LoadUserFailureAction = (data) => {
  return {
    type: LOAD_USER_FAILURE,
    data,
  };
};

export const loadUserAction = (data) => {
  return (dispatch) => {
    dispatch(LoadUserRequestAction());
    axios.get('/user')
    .then((user) => {
      dispatch(LoadUserSuccessAction(user));
    })
    .catch(() => {
      dispatch(LoadUserFailureAction())
    })
  }
}

export const loginAction = (data) => {
  return (dispatch) => {
    dispatch(LoginRequestAction());
    axios.post('/user/login', data)
    .then((user) => {
      dispatch(LoginSuccessAction(user));
    })
    .catch((err) => {
      dispatch(LoginFailureAction(err.response.data))
    })
  }
}


export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT_REQUEST,
    data,
  };
};
export const logoutSuccessAction = (data) => {
  return {
    type: LOG_OUT_SUCCESS,
    data,
  };
};
export const logoutFailureAction = (data) => {
  return {
    type: LOG_OUT_FAILURE,
    data,
  };
};

export const logoutAction = (data) => {
  return (dispatch) => {
    dispatch(logoutRequestAction());
    axios.post('/user/logout', data)
    .then(() => {
      dispatch(logoutSuccessAction());
    })
    .catch(() => {
      dispatch(logoutFailureAction())
    })
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NICK_CHANGE_SUCCESS : {
      return {
        ...state,
        nickchangeError: false,
        user: {
          ...state,
          data: {
            ...state,
            nickname: action.data,
          }
        },
      }
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state,
        nickchangeError: false,
      }
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        isloging: true,
        user: action.data,
        signupError: null,
        nickchangeError: false,
        loginError: null,
      }
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isloging: true,
        loginError: null,
      }
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        user: action.data,
        loginError: null,
      }
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        loginError: action.err,
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        user: action.data,
        signUpData: action.data,
        signupError: null,
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signupError: action.err,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        user: action.data,
        signupSuccess: true,
        signUpData: null,
        signupError: null,
      };
    }
    case NICK_CHANGE_REQUEST: {
      return {
        ...state,
        nickchangeError: false,
      };
    }
    case NICK_CHANGE_FAILURE: {
      return {
        ...state,
        nickchangeError: true,
      };
    }
    default: {
      return {
        ...state,
      }
    }
  }
};
