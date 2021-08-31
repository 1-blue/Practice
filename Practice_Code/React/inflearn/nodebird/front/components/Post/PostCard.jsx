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

import {
  removePostRequest,
  followRequest,
  unfollowRequest,
  addLikeRequest,
  removeLikeRequest,
} from "../../store/actions";

function PostCard({ post }) {
  const dispatch = useDispatch();

  // 로그인한 유저닉네임
  const me = useSelector(state => state.userReducer.me);
  const isFollow = me && me.Followings.find(follow => follow._id === post.User._id);
  // 팔로우 or 언팔로우버튼 로딩
  const { isFollowLoading, isUnfollowLoading } = useSelector(state => state.userReducer);
  // 삭제버튼로딩
  const { isRemovePostLoading } = useSelector(state => state.postReducer);
  // 댓글 토글
  const [commentsToggle, setCommentsToggle] = useState(false);
  // 내가 좋아요 눌렀는지 판단하는 변수
  const isLike = me && post.Likers.find(liker => liker._id === me._id);

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
  }, [isLike, commentsToggle, me, post, post.User, isRemovePostLoading]);

  // 팝오버할 버튼들
  const getPopoverBtns = useCallback(() => {
    // 본인게시글이면
    if (me && post && post.User._id === me._id) {
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
  }, [me, post, post.User, isRemovePostLoading]);

  // 좋아요버튼 상태에 따른 컴포넌트반환
  const getLikeBtn = useCallback(() => {
    if (isLike) {
      return <HeartTwoTone key="heart" onClick={onClickLikeBtn} twoToneColor="#eb2f96" />;
    }
    return <HeartOutlined key="heart" onClick={onClickLikeBtn} />;
  }, [isLike]);

  // 댓글버튼 상태에 따른 컴포넌트반환
  const getCommmentBtn = useCallback(() => {
    if (commentsToggle) {
      return <MessageTwoTone key="comment" onClick={onClickCommentBtn} twoToneColor="#52c41a" />;
    }
    return <MessageOutlined key="comment" onClick={onClickCommentBtn} />;
  }, [commentsToggle]);

  // 좋아요클릭
  const onClickLikeBtn = useCallback(() => {
    if (isLike) {
      dispatch(removeLikeRequest({ PostId: post._id }));
    } else {
      dispatch(addLikeRequest({ PostId: post._id }));
    }
  }, [isLike]);

  // 댓글클릭
  const onClickCommentBtn = useCallback(() => {
    // 서버로 비동기처리할 부분
    setCommentsToggle(prev => !prev);
  }, []);

  // 게시글 삭제 클릭
  const onClickPostRemoveBtn = useCallback(() => {
    dispatch(removePostRequest({ PostId: post._id }));
  }, [post._id]);

  // 팔로우 버튼
  const getFollowBtn = useCallback(() => {
    if (!(me && me._id) || post.User._id === me._id) return;

    return (
      <Button onClick={onClickFollowBtn} loading={isFollowLoading || isUnfollowLoading}>
        {isFollow ? "언팔로우" : "팔로우"}
      </Button>
    );
  }, [me, post.User, isFollow, isFollowLoading, isUnfollowLoading]);

  // 팔로우/언팔로우 버튼클릭
  const onClickFollowBtn = useCallback(() => {
    if (isFollow) return dispatch(unfollowRequest(post.User._id));
    return dispatch(followRequest(post.User._id));
  }, [post.User, isFollow]);

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
      {commentsToggle && <CommentContainer postId={post._id} comments={post.Comments} />}
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
