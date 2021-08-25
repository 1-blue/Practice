import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import CommentContainer from "../Comment/CommentContainer";

import { removePostRequest, followRequest, unfollowRequest } from "../../store/actions";

function PostCard({ post }) {
  const dispatch = useDispatch();

  // 로그인한 유저닉네임
  const me = useSelector(state => state.userReducer.me);
  const isFollow = me && me.Followings.find(follow => follow.id === post.User.id);
  // 팔로우 or 언팔로우버튼 로딩
  const { isFollowLoading, isUnfollowLoading } = useSelector(state => state.userReducer);
  // 삭제버튼로딩
  const { isRemovePostLoading } = useSelector(state => state.postReducer);
  // 좋아요 토글
  const [likeToggle, setLikeToggle] = useState(false);
  // 댓글 토글
  const [commentsToggle, setCommentsToggle] = useState(false);

  // 팝오버할 버튼들
  const getPopoverBtns = useCallback(() => {
    // 본인게시글이면
    if (me && post && post.User.nickname === me.nickname) {
      return (
        <>
          <Button>수정</Button>
          <Button type="primary" danger onClick={onClickPostRemoveBtn} loading={isRemovePostLoading}>
            삭제
          </Button>
        </>
      );
    }

    // 본인게시글아니면
    return (
      <>
        <Button>신고</Button>
      </>
    );
  }, [me, isRemovePostLoading]);

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
  }, [likeToggle, commentsToggle, isRemovePostLoading]);

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
  }, []);

  // 게시글 삭제 클릭
  const onClickPostRemoveBtn = useCallback(() => {
    dispatch(removePostRequest({ postId: post.id }));
  }, []);

  // 팔로우 버튼
  const getFollowBtn = useCallback(() => {
    if (!(me && me.id)) return;

    return (
      <Button onClick={onClickFollowBtn} loading={isFollowLoading || isUnfollowLoading}>
        {isFollow ? "언팔로우" : "팔로우"}
      </Button>
    );
  }, [me, isFollow, isFollowLoading, isUnfollowLoading]);

  // 팔로우버튼클릭
  const onClickFollowBtn = useCallback(() => {
    if (isFollow) return dispatch(unfollowRequest(post.User.id));
    return dispatch(followRequest(post.User.id));
  }, [post, isFollow]);

  return (
    <>
      {/* 하나의 게시글 */}
      <Card style={{ marginTop: 10 }} actions={getCardBtns()} extra={getFollowBtn()}>
        {/* 게시글작성자, 내용 */}
        {post.User && (
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={post.content}
          />
        )}

        {/* 게시글에 올린 이미지 */}
        {post.Images && <PostImagePreview images={post.Images} />}
      </Card>

      {/* 게시글의 댓글 */}
      {commentsToggle && <CommentContainer postId={post.id} comments={post.Comments} />}
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
