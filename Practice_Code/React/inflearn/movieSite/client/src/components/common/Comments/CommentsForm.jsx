import React from "react";

import "./Comments.css";

function CommentsForm({ onSubmitAppendComments, onChangeComments, commentsId }) {
  return (
    <form className="comments__form" onSubmit={e => onSubmitAppendComments(e, commentsId)}>
      <textarea type="text" placeholder="input comments" className="comments__textarea" onChange={onChangeComments} />
      <button type="submit" className="comments__btn">
        생성
      </button>
    </form>
  );
}

export default CommentsForm;
