import React, { useState } from "react";

import Like from "@/components/common/Like/Like";
import CommentsForm from "./CommentsForm";

function CommentsOption({ onSubmitAppendComments, onChangeComments, commentsId, like, dislike, onClickLike }) {
  const [isShowForm, setIsShowComments] = useState(false);

  const onClickShowForm = () => {
    setIsShowComments(!isShowForm);
  };

  return (
    <section className="comments__option">
      <div className="comments__like__container">
        <Like like={like} dislike={dislike} onClickLike={onClickLike} />
      </div>
      <button type="button" onClick={onClickShowForm}>
        답글달기
      </button>
      {isShowForm && (
        <CommentsForm
          onSubmitAppendComments={onSubmitAppendComments}
          onChangeComments={onChangeComments}
          commentsId={commentsId}
        />
      )}
    </section>
  );
}

export default CommentsOption;
