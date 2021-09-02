import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
// import Router from "next/router";

import { loadMeRequest } from "../store/actions";

import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { userInstance } from "../api";

// component
import AppLayout from "../components/common/AppLayout";
import NicknameChageForm from "../components/NicknameChageForm";
import FollowList from "../components/common/FollowList";

const Profile = () => {
  const { me } = useSelector(state => state.userReducer);

  // if (!me) {
  //   alert("로그인후에 접근해주세요!");
  //   Router.push("/");
  // }

  return (
    <>
      {me && (
        <AppLayout>
          {/* title수정 */}
          <Head>
            <title>내 정보 | nodebird</title>
          </Head>

          {/* 닉네임 수정 */}
          <NicknameChageForm>Hello, Profile</NicknameChageForm>

          {/* 팔로워리스트 */}
          <FollowList data={me.Followers} header="팔로워리스트" />

          {/* 팔로잉리스트 */}
          <FollowList data={me.Followings} header="팔로잉리스트" />
        </AppLayout>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  const cookie = req ? req.headers.cookie : "";
  userInstance.defaults.headers.Cookie = cookie;

  // 로그인유지
  store.dispatch(loadMeRequest());

  store.dispatch(END);
  await store.sagaTask.toPromise();

  userInstance.defaults.headers.Cookie = "";
});

export default Profile;
