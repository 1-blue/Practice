import React, { useState } from "react";

import CommentsForm from "./CommentsForm";

function CommentsOption({ onSubmitAppendComments, onChangeComments, commentsId }) {
  const [isShowForm, setIsShowComments] = useState(false);

  const onClickShowForm = () => {
    setIsShowComments(!isShowForm);
  };

  return (
    <section className="comments__option">
      <button type="button">👍0</button>
      <button type="button">👎0</button>
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
