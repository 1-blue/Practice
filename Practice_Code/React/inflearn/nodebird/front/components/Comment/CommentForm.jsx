import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";

import { addCommentRequest } from "../../store/actions";

function CommentForm({ postId }) {
  const dispatch = useDispatch();
  const { _id: userId } = useSelector(state => state.userReducer.me);
  const { isAddCommentLoading, isAddCommentDone } = useSelector(state => state.postReducer);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isAddCommentDone) {
      setContent("");
    }
  }, [isAddCommentDone]);

  // 댓글 입력이벤트
  const onChangeComment = useCallback(e => {
    setContent(e.target.value);
  }, []);

  // 댓글등록이벤트
  const onSubmitComment = useCallback(() => {
    dispatch(addCommentRequest({ userId, postId, content }));
    console.log("댓글전송", userId, postId);
  }, [userId, postId, content]);

  return (
    <Form onFinish={onSubmitComment}>
      <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} value={content} onChange={onChangeComment} />
      <Button type="primary" htmlType="submit" style={{ marginTop: "4px" }} loading={isAddCommentLoading}>
        등록
      </Button>
    </Form>
  );
}

export default CommentForm;
