import React from "react";
import Head from "next/head";

// component
import AppLayout from "../components/common/AppLayout";
import NicknameChageForm from "../components/NicknameChageForm";
import FollowList from "../components/common/FollowList";

// 임시데이터
const followerList = [{ nickname: "apple" }, { nickname: "blue" }, { nickname: "color" }, { nickname: "delete" }];
const followingList = [{ nickname: "egg" }, { nickname: "fox" }, { nickname: "gray" }, { nickname: "delete" }];

const Profile = () => {
  return (
    <AppLayout>
      {/* title수정 */}
      <Head>
        <title>내 정보 | nodebird</title>
      </Head>

      {/* 닉네임 수정 */}
      <NicknameChageForm>Hello, Profile</NicknameChageForm>

      {/* 팔로워리스트 */}
      <FollowList data={followerList} header="팔로워리스트" />

      {/* 팔로잉리스트 */}
      <FollowList data={followingList} header="팔로잉리스트" />
    </AppLayout>
  );
};

export default Profile;
