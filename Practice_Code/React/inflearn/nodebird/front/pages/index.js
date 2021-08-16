import React from "react";

import Head from "next/head";

// component
import AppLayout from "../components/common/AppLayout";

const Home = () => {
  return (
    <>
      <Head>
        <title>nodebird</title>
      </Head>
      <AppLayout>회원가입페이지</AppLayout>
    </>
  );
};

export default Home;
