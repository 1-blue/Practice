import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

// component
import AppLayout from "../components/common/AppLayout";
import NicknameChageForm from "../components/NicknameChageForm";
import FollowList from "../components/common/FollowList";

const Profile = () => {
  const { Followers, Followings } = useSelector(state => state.userReducer.me);

  return (
    <AppLayout>
      {/* title수정 */}
      <Head>
        <title>내 정보 | nodebird</title>
      </Head>

      {/* 닉네임 수정 */}
      <NicknameChageForm>Hello, Profile</NicknameChageForm>

      {/* 팔로워리스트 */}
      <FollowList data={Followers} header="팔로워리스트" />

      {/* 팔로잉리스트 */}
      <FollowList data={Followings} header="팔로잉리스트" />
    </AppLayout>
  );
};

export default Profile;
