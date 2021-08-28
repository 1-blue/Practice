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

  // 로그인유지
  useEffect(() => {
    dispatch(loadMeRequest());
  }, []);

  // 최초 게시글 로드
  useEffect(() => {
    dispatch(loadPostRequest({ page: 1 }));
  }, []);

  // 무한 스크롤링처리
  useEffect(() => {
    // 스크롤이벤트에 등록할 함수
    function scrollToLoad() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
        if (isLoadPostLoading) return;
        if (!isHasMorePost) return;
        // dispatch({ type: "LOAD_POSTS_REQUEST" });
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
