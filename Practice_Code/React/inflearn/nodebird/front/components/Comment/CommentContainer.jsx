import React from "react";
import { useSelector } from "react-redux";
import { Avatar, List, Comment } from "antd";
import PropTypes from "prop-types";

import CommentForm from "./CommentForm";

function CommentContainer({ postId, comments }) {
  const { isLoggedIn } = useSelector(state => state.userReducer);

  return (
    <>
      {/* 댓글입력폼 */}
      {isLoggedIn && <CommentForm postId={postId} />}

      {/* 댓글리스트 */}
      <List
        header={`${comments ? comments.length : 0}개의 댓글`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
          <List.Item>
            <Comment
              avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
              author={item.User.nickname}
              content={item.content}
            />
          </List.Item>
        )}
      />
    </>
  );
}

CommentContainer.prototype = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.object.isRequired,
};

export default CommentContainer;
