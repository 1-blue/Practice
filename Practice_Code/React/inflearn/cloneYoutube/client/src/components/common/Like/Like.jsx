import React from "react";

function Like({ onClickLike, like, dislike }) {
  return (
    <section>
      <button type="button" onClick={onClickLike} name="like">
        👍{like}
      </button>
      <button type="button" onClick={onClickLike} name="dislike">
        👎{dislike}
      </button>
    </section>
  );
}

export default Like;
