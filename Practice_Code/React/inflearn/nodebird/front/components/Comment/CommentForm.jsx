import React, { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";

function CommentForm() {
  const [commentText, setCommentText] = useState("");

  // 댓글 입력이벤트
  const onChangeComment = useCallback(e => {
    setCommentText(e.target.value);
  }, []);

  // 댓글등록이벤트
  const onSubmitComment = useCallback(() => {
    console.log(commentText);
    setCommentText("");
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} value={commentText} onChange={onChangeComment} />
      <Button type="primary" htmlType="submit" style={{ marginTop: "4px" }}>
        등록
      </Button>
    </Form>
  );
}

export default CommentForm;
