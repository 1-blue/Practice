import {
  LOAD_ME_REQUEST,
  LOAD_ME_SUCCESS,
  LOAD_ME_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_OF_ME,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from "../types";

const initState = {
  me: null,
  isLoggedIn: false,
  // 회원가입
  isSignupLoading: false,
  isSignupDone: null,
  isSignupError: null,

  // 로그인
  isLogginLoading: false,
  isLogginDone: null,
  isLogginError: null,

  // 로그아웃
  isLogoutLoading: false,
  isLogoutDone: null,
  isLogoutError: null,

  // 닉네임 변경
  isChangeNicknameLoading: false,
  isChangeNicknameDone: null,
  isChangeNicknameError: null,

  isFollowLoading: false,
  isUnfollowLoading: false,
};

function userReducer(prevState = initState, { type, data }) {
  switch (type) {
    // 내 정보 불러오기
    case LOAD_ME_REQUEST:
      return {
        ...prevState,
        isLoggedIn: false,
      };
    case LOAD_ME_SUCCESS:
      return {
        ...prevState,
        me: data.user,
        isLoggedIn: true,
      };
    case LOAD_ME_FAILURE:
      return {
        ...prevState,
        me: data.user,
        isLoggedIn: false,
      };

    // 회원가입
    case SIGNUP_REQUEST:
      return {
        ...prevState,
        isSignupLoading: true,
        isSignupDone: null,
        isSignupError: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...prevState,
        isSignupLoading: false,
        isSignupDone: data.message,
      };
    case SIGNUP_FAILURE:
      return {
        ...prevState,
        isSignupLoading: false,
        isSignupError: data.message,
      };

    // 로그인
    case LOGIN_REQUEST:
      return {
        ...prevState,
        isLogginLoading: true,
        isLogginDone: null,
        isLogginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        me: data.user,
        isLoggedIn: true,
        isLogginLoading: false,
        isLogginDone: data.message,
      };
    case LOGIN_FAILURE:
      return {
        ...prevState,
        isLoggedIn: false,
        isLogginLoading: false,
        isLogginError: data.message,
      };

    // 로그아웃
    case LOGOUT_REQUEST:
      return {
        ...prevState,
        isLogoutLoading: true,
        isLogoutDone: null,
        isLogoutError: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...prevState,
        me: null,
        isLoggedIn: false,
        isLogoutLoading: false,
        isLogoutDone: data.message,
      };
    case LOGOUT_FAILURE:
      return {
        ...prevState,
        isLoggedIn: true,
        isLogoutLoading: false,
        isLogoutError: data.message,
      };

    // 닉네임 변경
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...prevState,
        isChangeNicknameLoading: true,
        isChangeNicknameDone: null,
        isChangeNicknameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...prevState,
        me: {
          ...prevState.me,
          nickname: data.nickname,
        },
        isChangeNicknameLoading: false,
        isChangeNicknameDone: data.message,
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...prevState,
        isChangeNicknameLoading: false,
        isChangeNicknameError: data.message,
      };

    // 유저와 게시글 관련
    case ADD_POST_TO_ME:
      return {
        ...prevState,
        me: {
          ...prevState.me,
          Posts: [...prevState.me.Posts, { _id: data.post._id }],
        },
      };
    case REMOVE_POST_OF_ME:
      return {
        ...prevState,
        me: {
          ...prevState.me,
          Posts: prevState.me.Posts.filter(post => post._id !== data.PostId),
        },
      };

    // 팔로우
    case FOLLOW_REQUEST:
      return {
        ...prevState,
        isFollowLoading: true,
      };
    case FOLLOW_SUCCESS:
      console.log("Follow success data >> ", data);
      return {
        ...prevState,
        me: {
          ...prevState.me,
          Followings: [...prevState.me.Followings, { _id: data.FollowingId }],
        },
        isFollowLoading: false,
      };
    case FOLLOW_FAILURE:
      return {
        ...prevState,
        isFollowLoading: false,
      };
    // 언팔로우
    case UNFOLLOW_REQUEST:
      return {
        ...prevState,
        isUnfollowLoading: true,
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...prevState,
        me: {
          ...prevState.me,
          Followings: prevState.me.Followings.filter(follow => follow._id !== data.FollowingId),
        },
        isUnfollowLoading: false,
      };
    case UNFOLLOW_FAILURE:
      return {
        ...prevState,
        isUnfollowLoading: false,
      };

    default:
      return prevState;
  }
}

export default userReducer;
