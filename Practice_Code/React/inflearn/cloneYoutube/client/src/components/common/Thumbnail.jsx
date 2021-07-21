import React, { useState } from "react";

import { timeFormat, timeConverter } from "@/utils/filter";

import "./Thumbnail.css";

function Thumbnail({ video }) {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnter = () => {
    setIsHover(true);
  };

  const onMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <li>
      {/* 영상링크 */}
      <a href={`/video/${video._id}`}>
        <section className="thumbnail__container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {/* 썸네일 */}
          <img
            src={`http://localhost:3000/uploads/thumbnails/${video.thumbnailName}`}
            alt="썸네일"
            className="thumbnail"
          />

          {/* 영상 재생시간 */}
          <span className="video__time">{timeConverter(video.duration)}</span>

          {/* hover시 보여줄 icon */}
          {isHover && <i className="fas fa-play icon__play" />}

          {/* hover시 썸네일 검은색그림자 */}
          {isHover && <div className="thumbnail__shadow" />}
        </section>
      </a>

      {/* 영상 제목 */}
      <span className="video__title">{video.title}</span>

      {/* 영상 작성자 */}
      <span className="video__writer">{video.writer.name}</span>

      {/* 조회수 and 업로드시간 */}
      <span className="video__data">조회수: 0 • {timeFormat(video.updatedAt)}</span>
    </li>
  );
}

export default Thumbnail;
