import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../types";

const initState = {
  me: {
    isLoggedIn: false,
    data: null,
  },
  isLogginLoading: false,
  isLogoutLoading: false,
  isSignupLoading: false,
};

const dummyUser = data => ({
  ...data,
  nickname: "임시유저",
  id: 9999,
  Posts: [],
  Followings: [],
  Followers: [],
});

function userReducer(prevState = initState, { type, data }) {
  switch (type) {
    // 로그인
    case LOGIN_REQUEST:
      return {
        ...prevState,
        isLogginLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        me: dummyUser(data),
        isLoggedIn: true,
        isLogginLoading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...prevState,
        isLoggedIn: false,
        isLogginLoading: false,
      };

    // 로그아웃
    case LOGOUT_REQUEST:
      return {
        ...prevState,
        isLogoutLoading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...prevState,
        me: null,
        isLoggedIn: false,
        isLogoutLoading: false,
      };
    case LOGOUT_FAILURE:
      return {
        ...prevState,
        isLoggedIn: false,
        isLogoutLoading: false,
      };

    // 회원가입
    case SIGNUP_REQUEST:
      return {
        ...prevState,
        isSignupLoading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...prevState,
        isSignupLoading: false,
      };
    case SIGNUP_FAILURE:
      return {
        ...prevState,
        isSignupLoading: false,
      };

    default:
      return prevState;
  }
}

export default userReducer;
