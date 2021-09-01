/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";

import { loadPostRequest, loadMeRequest } from "../store/actions";

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

  // 로그인유지
  useEffect(() => {
    dispatch(loadMeRequest());
  }, []);

  // 최초 게시글 로드
  useEffect(() => {
    dispatch(loadPostRequest({ lastId: 0 }));
  }, []);

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
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export default Home;
