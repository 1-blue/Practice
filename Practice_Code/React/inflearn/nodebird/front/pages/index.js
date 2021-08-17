import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

// component
import AppLayout from "../components/common/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector(state => state.userReducer.me);
  const { mainPosts } = useSelector(state => state.postReducer);

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
