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
} from "../types";

const initState = {
  mainPosts: [],
  imagePaths: [],
  // 게시글 로드
  isLoadPostLoading: false,
  isLoadPostDone: false,

  // 게시글 로드 개수제한
  isHasMorePost: true,

  // 게시글 추가
  isAddPostLoading: false,
  isAddPostDone: false,

  // 게시글 삭제
  isRemovePostLoading: false,
  isRemovePostDone: false,

  // 댓글
  isAddCommentLoading: false,
  isAddCommentDone: false,
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
        isLoadPostDone: false,
      };
    case LOAD_POSTS_SUCCESS:
      tempMainPosts = [...prevState.mainPosts];
      tempMainPosts = data.post.concat(tempMainPosts);
      const isHasMorePost = tempMainPosts.length < 30;
      return {
        ...prevState,
        mainPosts: tempMainPosts,
        isLoadPostLoading: false,
        isLoadPostDone: true,
        isHasMorePost,
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...prevState,
        isLoadPostLoading: false,
        isLoadPostDone: true,
      };

    // 게시글추가
    case ADD_POST_REQUEST:
      return {
        ...prevState,
        isAddPostLoading: true,
        isAddPostDone: false,
      };
    case ADD_POST_SUCCESS:
      return {
        ...prevState,
        mainPosts: [...prevState.mainPosts, data.post],
        isAddPostLoading: false,
        isAddPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...prevState,
        isAddPostLoading: false,
        isAddPostDone: true,
      };

    // 게시글 삭제
    case REMOVE_POST_REQUEST:
      return {
        ...prevState,
        isRemovePostLoading: true,
        isRemovePostDone: false,
      };
    case REMOVE_POST_SUCCESS:
      // 지금은 임시로 여기서 게시글 삭제
      tempMainPosts = [...prevState.mainPosts];
      tempMainPosts = tempMainPosts.filter(post => post.id !== data.postId);

      return {
        ...prevState,
        mainPosts: tempMainPosts,
        isRemovePostLoading: false,
        isRemovePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...prevState,
        isRemovePostLoading: false,
        isRemovePostDone: true,
      };

    // 댓글추가
    case ADD_COMMENT_REQUEST:
      return {
        ...prevState,
        isAddCommentLoading: true,
        isAddCommentDone: false,
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
        isAddCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...prevState,
        isAddCommentLoading: false,
        isAddCommentDone: true,
      };

    // 좋아요
    case POST_LIKE_REQUEST:
      return {
        ...prevState,
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
      };
    case POST_LIKE_FAILURE:
      return {
        ...prevState,
      };
    case POST_UNLIKE_REQUEST:
      return {
        ...prevState,
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
      };
    case POST_UNLIKE_FAILURE:
      return {
        ...prevState,
      };

    default:
      return prevState;
  }
}

export default postReducer;
