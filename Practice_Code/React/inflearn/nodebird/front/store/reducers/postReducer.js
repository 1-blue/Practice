import { ADD_POST } from "../types";

const initState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "admin-user",
      },
      content: "Test-Post",
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
  postAdded: false,
};

const dummyPost = {
  id: 2,
  content: "admin-user의 포스트 내용!",
  User: {
    id: 1,
    nickname: "admin-user",
  },
  Images: [],
  Comment: [],
};

function postReducer(prevState = initState, { type, data }) {
  switch (type) {
    case ADD_POST:
      return {
        ...prevState,
        mainPosts: [dummyPost, ...prevState.mainPosts],
        postAdded: true,
      };

    default:
      return prevState;
  }
}

export default postReducer;
