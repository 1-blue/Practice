import React from "react";

import { timeFormat } from "@/utils/filter";

import "./VideoInfo.css";

function VideoInfo({ video }) {
  return (
    <>
      {/* 영상 제목 */}
      <span className="video__title">{video.title}</span>

      {/* 영상 작성자 */}
      <span className="video__writer">{video.writer.name}</span>

      {/* 조회수 and 업로드시간 */}
      <span className="video__data">조회수: 0 • {timeFormat(video.updatedAt)}</span>
    </>
  );
}

export default VideoInfo;
