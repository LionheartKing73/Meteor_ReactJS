export const SET_USER = 'user/SET_USER';
export const INIT = 'user/INIT';
export const LOGIN_START = 'user/INIT';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'user/LOGIN_FAIL';

const initialState = {
  user: {},
  loggingIn: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type){
    case SET_USER: {
      return {
        ...state,
        user: action.user
      }
    }

    case LOGIN_START: {
      return {
        ...state,
        loggingIn: true,
        error: null
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loggingIn: false,
        user: action.user,
        error: null
      }
    }

    case LOGIN_FAIL: {
      return {
        ...state,
        loggingIn: false,
        error: action.error || true
      }
    }

    default: return state;
  }
};

export const handleUser = action => dispatch => {
  dispatch(action);
};
