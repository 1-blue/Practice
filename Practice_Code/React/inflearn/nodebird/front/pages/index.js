/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";

import wrapper from "../store/configureStore";
import { END } from "redux-saga"

import { loadPostRequest, loadMeRequest } from "../store/actions";
import { userInstance } from "../api"

// component
import AppLayout from "../components/common/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/Post/PostCard";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoadPostLoading, isHasMorePost } = useSelector(state => state.postReducer);
  const { isLoggedIn } = useSelector(state => state.userReducer);
  const { mainPosts } = useSelector(state => state.postReducer);

  // 이친구들 위치를 어디다 둘지 생각해봐야할것같음
  // 지금 페이지 이동할 때 마다 메시지 울림
  // 생각되는건 message값을 null로 만드는 액션을 만드는건데 액션안만들고 하는법 있는지 생각중
  const { isFollowDone, isUnfollowDone } = useSelector(state => state.userReducer);
  const { isAddPostDone, isRemovePostDone, isAddCommentDone, isPostLikeDone, isPostUnlikeDone, isRetweetDone, isRetweetError} = useSelector(state => state.postReducer);
  
  useEffect(() => (isFollowDone ? alert(isFollowDone) : null), [isFollowDone]);
  useEffect(() => (isUnfollowDone ? alert(isUnfollowDone) : null), [isUnfollowDone]);

  useEffect(() => (isAddPostDone ? alert(isAddPostDone) : null), [isAddPostDone]);
  useEffect(() => (isRemovePostDone ? alert(isRemovePostDone) : null), [isRemovePostDone]);
  useEffect(() => (isAddCommentDone ? alert(isAddCommentDone) : null), [isAddCommentDone]);
  useEffect(() => (isPostLikeDone ? alert(isPostLikeDone) : null), [isPostLikeDone]);
  useEffect(() => (isPostUnlikeDone ? alert(isPostUnlikeDone) : null), [isPostUnlikeDone]);
  useEffect(() => (isRetweetDone ? alert(isRetweetDone) : null), [isRetweetDone]);
  useEffect(() => (isRetweetError ? alert(isRetweetError) : null), [isRetweetError]);

  // 무한 스크롤링처리
  useEffect(() => {
    // 스크롤이벤트에 등록할 함수
    function scrollToLoad() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
        if (isLoadPostLoading) return;
        if (!isHasMorePost) return;
        const lastId = mainPosts[mainPosts.length - 1]._id;
        dispatch(loadPostRequest({ lastId }));
      }
    }

    // 스크롤이벤트 등록
    document.addEventListener("scroll", scrollToLoad);

    // 스크롤이벤트 등록해제
    return () => {
      document.removeEventListener("scroll", scrollToLoad);
    };
  }, [isLoadPostLoading]);

  return (
    <>
      <Head>
        <title>nodebird</title>
      </Head>
      <AppLayout>
        {isLoggedIn && <PostForm />}
        {mainPosts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

// 서버 사이드 랜더링 적용 ( 화면에 필요한 데이터를 서버측에서 미리 redux로 불러와서 적용시킨후 완성된 html을 클라이언트로 전달 )
// 이부분이 Home컴포넌트보다 먼저 실행됨
// 첫번째 인수인 store은 configureStore.js에서 wrapper에 넣어준 store과 같음
// 두번째 req, res는 전달값, 전송값(?)이 들어가 있음
export const getServerSideProps = wrapper.getServerSideProps(
  store => 
  async ({req, res, ...etc}) => {
    // front-server와 backend-server가 서로 다르기때문에 쿠키를 직접 넣어줌
    let cookie = req?.headers?.cookie;
    cookie = cookie ? cookie : "";
    userInstance.defaults.headers.Cookie = cookie;

    // 로그인유지
    store.dispatch(loadMeRequest());
    
    // 최초 게시글 로드
    store.dispatch(loadPostRequest({ lastId: 0 }));

    // 위 두개의 dispatch()가 호출되고나서 HYDRATE에 결과가 전달됨
  
    // 밑에 두개는 REQUEST이후 SUCCESS가 될 때 까지 기다려주게 해주는 코드
    store.dispatch(END);
    await store.sagaTask.toPromise();

    userInstance.defaults.headers.Cookie = "";
  }
);

export default Home;
