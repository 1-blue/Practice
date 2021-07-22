import React, { useState } from "react";

import { timeFormat } from "@/utils/filter";

import CommentsOption from "./CommentsOption";

function CommentsReply({ commentsList, comments, onSubmitAppendComments, onChangeComments }) {
  const [isShowRecomments, setIsShowRecomments] = useState(false);

  // 대댓글 개수 ( 출력할 댓글의 아이디를 참조하는 댓글의 개수 구하기 )
  const commentsNumber = () => commentsList.filter(vComments => vComments.commentsId === comments._id).length;

  // 답글 존재하면 답글 보여주기
  const showRecomments = () => {
    // 현 댓글의 대댓글들 찾기
    const recomments = commentsList.filter(vComments => {
      if (vComments.commentsId === comments._id) {
        return true;
      }
      return false;
    });

    // 찾은 대댓글들 화면에 그리기
    return recomments.map(vComments => (
      <CommentsReply
        key={vComments._id}
        commentsList={commentsList}
        comments={vComments}
        onSubmitAppendComments={onSubmitAppendComments}
        onChangeComments={onChangeComments}
      />
    ));
  };

  // 답글보기 toggle
  const onClickToggleRecomments = () => {
    setIsShowRecomments(!isShowRecomments);
  };

  return (
    <section className="comments__wrapper">
      {/* 유저의 프로필이미지 -임시대체- */}
      <div className="circle" />

      {/* 댓글의 정보 */}
      <section className="comments__data">
        {/* 댓글작성유저이름 및 작성시간 */}
        <span className="comments__writer">
          {comments.userId.name} ({timeFormat(comments.updatedAt)})
        </span>

        {/* 댓글 내용 */}
        <pre>{comments.contents}</pre>

        {/* 댓글의 옵션버튼들 ( 좋아요, 싫어요, 답글달기 ) */}
        <CommentsOption
          onSubmitAppendComments={onSubmitAppendComments}
          onChangeComments={onChangeComments}
          commentsId={comments._id}
        />

        {/* 답글더보기 버튼 */}
        <button type="button" onClick={onClickToggleRecomments} className="recomments__toggle__btn">
          {commentsNumber() > 0 && `${commentsNumber()}개 답글더보기`}
        </button>

        {/* 답글 존재하면 답글보여주기 */}
        {isShowRecomments && showRecomments()}
      </section>
    </section>
  );
}

export default CommentsReply;
