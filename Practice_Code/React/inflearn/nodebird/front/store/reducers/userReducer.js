import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "../types";

const initState = {
  me: {
    isLoggedIn: false,
    data: null,
    isLogging: false,
  },
};

function userReducer(prevState = initState, { type, data }) {
  switch (type) {
    // 로그인관련
    case LOGIN_REQUEST:
      return {
        ...prevState,
        me: {
          isLoggedIn: false,
          isLogging: true,
          data,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        me: {
          isLoggedIn: true,
          isLogging: false,
          data,
        },
      };
    case LOGIN_FAILURE:
      return {
        ...prevState,
        me: {
          isLoggedIn: false,
          isLogging: false,
          data,
        },
      };

    // 로그아웃관련
    case LOGOUT_REQUEST:
      return {
        ...prevState,
        me: {
          isLoggedIn: true,
          isLogging: true,
          data,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...prevState,
        me: {
          isLoggedIn: false,
          isLogging: false,
          data,
        },
      };
    case LOGOUT_FAILURE:
      return {
        ...prevState,
        me: {
          isLoggedIn: true,
          isLogging: false,
          data,
        },
      };

    default:
      return prevState;
  }
}

export default userReducer;
