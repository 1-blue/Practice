import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Button } from "antd";

import { userLogoutRequest } from "../store/actions";

function UserProfile() {
  const dispatch = useDispatch();
  const { nickname, Posts, Followings, Followers } = useSelector(state => state.userReducer.me);
  const { isLogoutLoading, isLogginDone, isLogoutError } = useSelector(state => state.userReducer);

  // 로그인 성공시 메시지
  useEffect(() => (isLogginDone ? alert(isLogginDone) : null), [isLogginDone]);

  // 로그아웃 실패시 메시지
  useEffect(() => (isLogoutError ? alert(isLogoutError) : null), [isLogoutError]);

  const onLogout = useCallback(() => {
    dispatch(userLogoutRequest());
  });

  // 유저프로필 보여줄 카드 ( 트윗, 팔로잉, 팔로워, 유저이미지, 로그아웃 )
  return (
    <Card
      actions={[
        <button type="button" key="twit">
          <span>트윗</span>
          <br />
          <span>{Posts.length}</span>
        </button>,
        <button type="button" key="following">
          <span>팔로잉</span>
          <br />
          <span>{Followings.length}</span>
        </button>,
        <button type="button" key="follower">
          <span>팔로워</span>
          <br />
          <span>{Followers.length}</span>
        </button>,
      ]}
    >
      <Card.Meta title={nickname} avatar={<Avatar>{nickname[0]}</Avatar>} />
      <Button onClick={onLogout} loading={isLogoutLoading}>
        로그아웃
      </Button>
    </Card>
  );
}

export default UserProfile;
