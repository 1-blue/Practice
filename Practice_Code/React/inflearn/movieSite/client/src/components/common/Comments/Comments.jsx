import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { apiFetchComments, apiAppendComments } from "@/api";

import CommentsForm from "./CommentsForm";
import CommentsSingle from "./CommentsSingle";

function Comments({ movieId }) {
  const user = useSelector(state => state.userReducer.userData);
  const [commentsList, setCommentsList] = useState(null);
  const [contents, setContents] = useState(null);

  useEffect(async () => {
    await onFetchData();
  }, []);

  // 댓글 제출
  const onSubmitAppendComments = async (e, commentsId) => {
    e.preventDefault();

    // 비로그인시
    if (!user.result) {
      return alert("로그인후에 댓글을 작성해주세요");
    }

    await apiAppendComments({ movieId, commentsId, userId: user._id, contents });
    onFetchData();
  };

  // 댓글 쓰기
  const onChangeComments = async e => {
    setContents(e.target.value);
  };

  // 댓글 작성후 데이터 리패치
  const onFetchData = async () => {
    setCommentsList(await apiFetchComments(movieId));
  };

  return (
    <section className="comments__container">
      <CommentsForm onSubmitAppendComments={onSubmitAppendComments} onChangeComments={onChangeComments} />
      {commentsList &&
        commentsList.map(comments => (
          <CommentsSingle
            key={comments._id}
            commentsList={commentsList}
            comments={comments}
            onSubmitAppendComments={onSubmitAppendComments}
            onChangeComments={onChangeComments}
          />
        ))}
    </section>
  );
}

export default Comments;
