import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import PostContainer from "./PostContainer";

function PostCard({ post }) {
  return (
    <>
      {/* 게시글 */}
      {post && <PostContainer post={post} />}

      {/* 더보기 */}
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
