import { ADD_POST } from "../types";

const initState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "Test-User",
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
      ],
      Comments: [
        {
          User: {
            nickname: "Test-User-2",
          },
          content: "Test-Comment",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const dummyPost = {
  id: 2,
  content: "임시포스트",
  User: {
    id: 1,
    nickname: "Test-User",
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
