import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Button } from "antd";

import { userLogout } from "../store/actions";

function UserProfile() {
  const dispatch = useDispatch();
  const { nickname } = useSelector(state => state.userReducer.me);
  const { isLogoutLoading } = useSelector(state => state.userReducer);

  const onLogout = useCallback(() => {
    dispatch(userLogout());
  });

  // 유저프로필 보여줄 카드 ( 트윗, 팔로잉, 팔로워, 유저이미지, 로그아웃 )
  return (
    <Card
      actions={[
        <button type="button" key="twit">
          <span>트윗</span>
          <br />
          <span>0</span>
        </button>,
        <button type="button" key="following">
          <span>팔로잉</span>
          <br />
          <span>0</span>
        </button>,
        <button type="button" key="follower">
          <span>팔로워</span>
          <br />
          <span>0</span>
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
