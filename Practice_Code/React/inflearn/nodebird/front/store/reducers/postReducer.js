import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAILURE,
  POST_UNLIKE_REQUEST,
  POST_UNLIKE_SUCCESS,
  POST_UNLIKE_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
} from "../types";

const initState = {
  // 게시글들이 들어갈 변수
  mainPosts: [],

  // 이미지 업로드시 이미지 프리뷰보여주기위한 이미지경로 임시저장변수
  imagePaths: [],

  // 게시글 로드 개수제한
  isHasMorePost: true,

  // 게시글 로드
  isLoadPostLoading: false,
  isLoadPostDone: null,
  isLoadPostError: null,

  // 게시글 추가
  isAddPostLoading: false,
  isAddPostDone: null,
  isAddPostError: null,

  // 게시글 삭제
  isRemovePostLoading: false,
  isRemovePostDone: null,
  isRemovePostError: null,

  // 댓글 추가
  isAddCommentLoading: false,
  isAddCommentDone: null,
  isAddCommentError: null,

  // 좋아요 추가
  isPostLikeLoading: false,
  isPostLikeDone: null,
  isPostLikeError: null,

  // 좋아요 삭제
  isPostUnlikeLoading: false,
  isPostUnlikeDone: null,
  isPostUnlikeError: null,

  // 이미지 업로드
  isUploadImageLoading: false,
  isUploadImageDone: null,
  isUploadImageError: null,

  // 리트윗
  isRetweetLoading: false,
  isRetweetDone: null,
  isRetweetError: null,
};

// 불변성 유지를 위해 임시로 게시글들의 정보를 넣을 변수
let tempMainPosts = null;
let targetPostIndex = null;
let targetPost = null;
let targetPostLiker = null;

function postReducer(prevState = initState, { type, data }) {
  switch (type) {
    // 게시글로드
    case LOAD_POSTS_REQUEST:
      return {
        ...prevState,
        isLoadPostLoading: true,
        isLoadPostDone: null,
        isLoadPostError: null,
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...prevState,
        mainPosts: [...prevState.mainPosts, ...data.post],
        isLoadPostLoading: false,
        isLoadPostDone: data.message,
        isHasMorePost: data.post.length === 10,
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...prevState,
        isLoadPostLoading: false,
        isLoadPostError: data.message,
      };

    // 게시글추가
    case ADD_POST_REQUEST:
      return {
        ...prevState,
        isAddPostLoading: true,
        isAddPostDone: false,
        isAddPostError: null,
      };
    case ADD_POST_SUCCESS:
      tempMainPosts = [...prevState.mainPosts];
      tempMainPosts.unshift(data.post);
      return {
        ...prevState,
        mainPosts: tempMainPosts,
        imagePaths: [],
        isAddPostLoading: false,
        isAddPostDone: data.message,
      };
    case ADD_POST_FAILURE:
      return {
        ...prevState,
        isAddPostLoading: false,
        isAddPostError: data.message,
      };

    // 게시글 삭제
    case REMOVE_POST_REQUEST:
      return {
        ...prevState,
        isRemovePostLoading: true,
        isRemovePostDone: null,
        isRemovePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      tempMainPosts = [...prevState.mainPosts];
      tempMainPosts = tempMainPosts.filter(post => post._id !== data.PostId);

      return {
        ...prevState,
        mainPosts: tempMainPosts,
        isRemovePostLoading: false,
        isRemovePostDone: data.message,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...prevState,
        isRemovePostLoading: false,
        isAddPostError: data.message,
      };

    // 댓글추가
    case ADD_COMMENT_REQUEST:
      return {
        ...prevState,
        isAddCommentLoading: true,
        isAddCommentDone: false,
        isAddCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      // 메인게시글리스트 복사
      tempMainPosts = [...prevState.mainPosts];
      // 변경할 게시글의 index찾고
      targetPostIndex = prevState.mainPosts.findIndex(post => post._id === data.comment.PostId);
      // 댓글을 등록할 게시글 찾고
      targetPost = prevState.mainPosts[targetPostIndex];
      // 해당 게시글에 유저정보, 댓글내용을 넣음
      targetPost.Comments.unshift(data.comment);
      // 해당 게시글을 게시글리스트에 넣음
      tempMainPosts[targetPostIndex] = targetPost;

      return {
        ...prevState,
        mainPosts: tempMainPosts,
        isAddCommentLoading: false,
        isAddCommentDone: data.message,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...prevState,
        isAddCommentLoading: false,
        isAddCommentError: data.message,
      };

    // 좋아요 추가
    case POST_LIKE_REQUEST:
      return {
        ...prevState,
        isPostLikeLoading: false,
        isPostLikeDone: null,
        isPostLikeError: null,
      };
    case POST_LIKE_SUCCESS:
      // 메인게시글리스트 복사
      tempMainPosts = [...prevState.mainPosts];
      // 변경할 게시글의 index찾고
      targetPostIndex = prevState.mainPosts.findIndex(post => post._id === data.PostId);
      // 댓글을 등록할 게시글 찾고
      targetPost = prevState.mainPosts[targetPostIndex];
      // 해당 게시글에 유저정보, 댓글내용을 넣음
      targetPost.Likers.push({ _id: data.UserId });
      // 해당 게시글을 게시글리스트에 넣음
      tempMainPosts[targetPostIndex] = targetPost;
      return {
        ...prevState,
        mainPosts: tempMainPosts,
        isPostLikeLoading: true,
        isPostLikeDone: data.message,
      };
    case POST_LIKE_FAILURE:
      return {
        ...prevState,
        isPostLikeLoading: true,
        isPostLikeError: data.message,
      };

    // 좋아요 삭제
    case POST_UNLIKE_REQUEST:
      return {
        ...prevState,
        isPostUnlikeLoading: false,
        isPostUnlikeDone: null,
        isPostUnlikeError: null,
      };
    case POST_UNLIKE_SUCCESS:
      // 메인게시글리스트 복사
      tempMainPosts = [...prevState.mainPosts];
      // 변경할 게시글의 index찾고
      targetPostIndex = prevState.mainPosts.findIndex(post => post._id === data.PostId);
      // 댓글을 등록할 게시글 찾고
      targetPost = prevState.mainPosts[targetPostIndex];
      // 해당 게시글에 유저정보, 댓글내용을 넣음
      targetPostLiker = targetPost.Likers.filter(liker => liker._id !== data.UserId);
      targetPost.Likers = targetPostLiker;
      // 해당 게시글을 게시글리스트에 넣음
      tempMainPosts[targetPostIndex] = targetPost;
      return {
        ...prevState,
        mainPosts: tempMainPosts,
        isPostUnlikeLoading: true,
        isPostUnlikeDone: data.message,
      };
    case POST_UNLIKE_FAILURE:
      return {
        ...prevState,
        isPostUnlikeLoading: true,
        isPostUnlikeError: data.message,
      };

    // 이미지 업로드
    case UPLOAD_IMAGES_REQUEST:
      return {
        ...prevState,
        isUploadImageLoading: false,
        isUploadImageDone: false,
        isUploadImageError: null,
      };
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...prevState,
        imagePaths: data.imagePaths,
        isUploadImageLoading: true,
        isUploadImageDone: true,
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...prevState,
        isUploadImageLoading: true,
        isUploadImageError: data.message,
      };

    // 리트윗
    case RETWEET_REQUEST:
      return {
        ...prevState,
        isRetweetLoading: true,
        isRetweetDone: false,
        isRetweetError: null,
      };
    case RETWEET_SUCCESS:
      return {
        ...prevState,
        mainPosts: [data.retweetPost, ...prevState.mainPosts],
        isRetweetLoading: false,
        isRetweetDone: data.message,
      };
    case RETWEET_FAILURE:
      return {
        ...prevState,
        isRetweetLoading: false,
        isRetweetError: data.message,
      };

    default:
      return prevState;
  }
}

export default postReducer;
