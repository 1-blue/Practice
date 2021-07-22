import React, { useState } from "react";

import { apiAppendViews } from "@/api";

import { timeConverter } from "@/utils/filter";

import "./Thumbnail.css";

function Thumbnail({ video, width }) {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnter = () => {
    setIsHover(true);
  };

  const onMouseLeave = () => {
    setIsHover(false);
  };

  // 조회수++
  const onClickThumbnail = async () => {
    await apiAppendViews(video._id);
  };

  const widthSize = () => (width ? `${width}px` : "100%");

  return (
    <>
      {/* 영상링크 */}
      <a href={`/video/${video._id}`} onClick={onClickThumbnail}>
        <section className="thumbnail__container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {/* 썸네일 */}
          <img
            src={`http://localhost:3000/uploads/thumbnails/${video.thumbnailName}`}
            alt="썸네일"
            className="thumbnail"
            style={{ width: widthSize() }}
          />

          {/* 영상 재생시간 */}
          <span className="video__time">{timeConverter(video.duration)}</span>

          {/* hover시 보여줄 icon */}
          {isHover && <i className="fas fa-play icon__play" />}

          {/* hover시 썸네일 검은색그림자 */}
          {isHover && <div className="thumbnail__shadow" />}
        </section>
      </a>
    </>
  );
}

export default Thumbnail;
