import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Popover, Button } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
  MessageTwoTone,
} from "@ant-design/icons";
import PropTypes from "prop-types";

import PostImagePreview from "./PostImagePreview";

function PostContainer({ user, images, content, commentsToggle, setCommentsToggle }) {
  // 로그인한 유저닉네임
  const { nickname } = useSelector(state => state.userReducer.me);

  // 좋아요 토글
  const [likeToggle, setLikeToggle] = useState(false);

  // 팝오버할 버튼들
  const getPopoverBtns = useCallback(() => {
    // 본인게시글이면
    if (user && user.nickname === nickname) {
      return (
        <>
          <Button>수정</Button>
          <Button>삭제</Button>
        </>
      );
    }

    // 본인게시글아니면
    return (
      <>
        <Button>신고</Button>
      </>
    );
  }, [user, nickname]);

  // 카드의 버튼들
  const getCardBtns = useCallback(() => {
    return [
      <RetweetOutlined key="retweet" />,
      getLikeBtn(),
      getCommmentBtn(),
      <Popover content={getPopoverBtns()} key="ellipsis">
        <EllipsisOutlined />
      </Popover>,
    ];
  }, [likeToggle, commentsToggle]);

  // 좋아요버튼 상태에 따른 컴포넌트반환
  const getLikeBtn = useCallback(() => {
    if (likeToggle) {
      return <HeartTwoTone key="heart" onClick={onClickLikeBtn} twoToneColor="#eb2f96" />;
    }
    return <HeartOutlined key="heart" onClick={onClickLikeBtn} />;
  }, [likeToggle]);

  // 댓글버튼 상태에 따른 컴포넌트반환
  const getCommmentBtn = useCallback(() => {
    if (commentsToggle) {
      return <MessageTwoTone key="comment" onClick={onClickCommentBtn} twoToneColor="#52c41a" />;
    }
    return <MessageOutlined key="comment" onClick={onClickCommentBtn} />;
  }, [commentsToggle]);

  // 좋아요클릭
  const onClickLikeBtn = useCallback(() => {
    // 서버로 비동기처리할 부분
    setLikeToggle(prev => !prev);
  }, []);

  // 댓글클릭
  const onClickCommentBtn = useCallback(() => {
    // 서버로 비동기처리할 부분
    setCommentsToggle(prev => !prev);
  });

  return (
    <>
      {/* 하나의 게시글 */}
      <Card style={{ marginTop: 10 }} actions={getCardBtns()}>
        {/* 게시글작성자, 내용 */}
        <Card.Meta avatar={<Avatar>{user.nickname[0]}</Avatar>} title={user.nickname} description={content} />

        {/* 게시글에 올린 이미지 */}
        {images && <PostImagePreview images={images} />}
      </Card>
    </>
  );
}

PostContainer.prototype = {
  user: PropTypes.object.isRequired,
  images: PropTypes.arrayOf(PropTypes.object),
  content: PropTypes.string,
  commentsToggle: PropTypes.bool.isRequired,
  setCommentsToggle: PropTypes.func.isRequired,
};

export default PostContainer;
