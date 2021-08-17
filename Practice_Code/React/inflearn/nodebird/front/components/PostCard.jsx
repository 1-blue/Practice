import React, { useEffect, useState, useCallback } from "react";
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

function PostCard({ post }) {
  // 로그인한 유저닉네임
  const { nickname } = useSelector(state => state.userReducer.me);
  // 게시글작성한 유저정보
  const [user, setUser] = useState(null);
  // 게시글의 댓글정보
  const [comments, setComments] = useState(null);
  // 게시글 이미지
  const [images, setImages] = useState(null);
  // 좋아요, 댓글 토글
  const [likeToggle, setLikeToggle] = useState(false);
  const [commentsToggle, setCommentsToggle] = useState(false);

  // 사용할 변수들 구조분해할당
  useEffect(() => {
    // console.log("post >> ", post);

    const { User, Comments, Images } = post;
    setUser(User);
    setComments(Comments);
    setImages(Images);
  }, []);

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
      {/* 게시글 */}
      {user && (
        <Card style={{ marginTop: 10 }} actions={getCardBtns()}>
          <Card.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={user.nickname}
            description={post.content}
          />
        </Card>
      )}

      {/* 댓글 */}

      {/* 더보기 */}
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
