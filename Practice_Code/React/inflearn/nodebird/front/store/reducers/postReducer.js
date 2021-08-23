import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../types";

const initState = {
  mainPosts: [
    {
      id: 1,
      content: "테스트유저의 테스트 게시글의 테스트내용",
      User: {
        id: 1,
        nickname: "테스트유저",
      },
      Images: [
        {
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20120615_9%2Fvibedih_13397492628311VnCT_JPEG%2F03-1.jpg&type=sc960_832",
        },
        {
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20160229_20%2Fjose7257_1456724491838Ef0jm_JPEG%2F740_IMG_20160229_144014.jpg&type=sc960_832",
        },
        {
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxOTA0MTVfMTg1%2FMDAxNTU1MzM5NjIwMzY2.NozLtri_lneW8Esb6YgsSYX1Ifyobiszdz063GvGBDEg.fhtR4cnlz8WiXrpUOG91jmiXUfag69Ocw2iw6Zyv_QUg.JPEG.hdgd4344%2F2015020508581147405-540x385.jpg&type=sc960_832",
        },
        {
          src: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn4.vectorstock.com%2Fi%2F1000x1000%2F95%2F53%2Fhomeschooling-vector-35529553.jpg&type=sc960_832",
        },
        {
          src: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F52%2F26%2F78%2F5226783a6fa4820fc2d3721ff39a38c1.jpg&type=a340",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "a-user",
          },
          content: "a-user의 댓글",
        },
        {
          User: {
            nickname: "b-user",
          },
          content: "b-user의 댓글",
        },
      ],
    },
  ],
  imagePaths: [],
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

// 게시글 임시데이터 크리에이터
const dummyPost = ({ postId, userId, content }) => ({
  id: postId,
  content,
  User: {
    id: userId,
    nickname: "임시유저",
  },
  Images: [],
  Comments: [],
});

import shortId from "shortid";
// 댓글 임시데이터 크리에이터
const dummyComment = data => ({
  id: shortId.generate(),
  content: data.content,
  User: {
    id: data.userId,
    nickname: "임시유저",
  },
  Images: [],
  Comments: [],
});

let mainPosts = null;

function postReducer(prevState = initState, { type, data }) {
  switch (type) {
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
        mainPosts: [dummyPost(data), ...prevState.mainPosts],
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
      mainPosts = [...prevState.mainPosts];
      const tempPosts = mainPosts.filter(post => post.id !== data.postId);

      return {
        ...prevState,
        mainPosts: [...tempPosts],
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
      mainPosts = [...prevState.mainPosts];
      // 변경할 게시글의 index찾고
      const targetPostIndex = prevState.mainPosts.findIndex(post => post.id === data.postId);
      // 댓글을 등록할 게시글 찾고
      const targetPost = prevState.mainPosts[targetPostIndex];
      // 해당 게시글에 유저정보, 댓글내용을 넣음
      targetPost.Comments = [dummyComment(data), ...targetPost.Comments];
      // 해당 게시글을 게시글리스트에 넣음
      mainPosts[targetPostIndex] = targetPost;

      return {
        ...prevState,
        mainPosts,
        isAddCommentLoading: false,
        isAddCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...prevState,
        isAddCommentLoading: false,
        isAddCommentDone: true,
      };

    default:
      return prevState;
  }
}

export default postReducer;
