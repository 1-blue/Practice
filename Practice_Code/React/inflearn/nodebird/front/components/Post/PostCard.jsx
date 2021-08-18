import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import CommentContainer from "../Comment/CommentContainer";
import PostContainer from "./PostContainer";

function PostCard({ post }) {
  // 게시글작성한 유저정보
  const [user, setUser] = useState(null);
  // 게시글의 댓글정보
  const [comments, setComments] = useState(null);
  // 게시글 이미지
  const [images, setImages] = useState(null);
  // 댓글 토글 ( 원래는 PostContainer에서 사용하는데 토글값이 부모컴포넌트인 PostCard에서 필요해서 부모컴포넌트에 선언후 props로 내려줌 )
  const [commentsToggle, setCommentsToggle] = useState(false);

  // 사용할 변수들 구조분해할당
  useEffect(() => {
    // console.log("post >> ", post);

    const { User, Comments, Images } = post;
    setUser(User);
    setComments(Comments);
    setImages(Images);
  }, []);

  return (
    <>
      {/* 게시글 */}
      {user && (
        <PostContainer
          user={user}
          images={images}
          content={post.content}
          commentsToggle={commentsToggle}
          setCommentsToggle={setCommentsToggle}
        />
      )}

      {/* 댓글 */}
      {comments && commentsToggle && <CommentContainer comments={comments} />}

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
