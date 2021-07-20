import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import { apiFetchAllVideo } from "@/api";

import "./homePage.css";

function HomePage() {
  const [videos, setVideos] = useState([]);

  // 저장된 모든 비디오 정보 가져오기
  useEffect(async () => {
    const data = await apiFetchAllVideo();

    setVideos(data);
  }, []);

  // 비디오들 화면에 그리기
  const renderVideos = () =>
    videos &&
    videos.map(video => {
      console.log("a");
      return (
        <li key={video._id}>
          {/* 영상보러가기 */}
          <a href={`/video/${video._id}`}>
            <img
              src={`http://localhost:3000/uploads/thumbnails/${video.thumbnailName}`}
              alt="썸네일"
              className="thumbnail"
            />
          </a>

          {/* 영상 재생시간 */}
          <span className="video__time">{timeConverter(video.duration)}</span>

          {/* 영상 제목 */}
          <span className="video__title">{video.title}</span>

          {/* 영상 작성자 */}
          <span className="video__writer">{video.writer.name}</span>

          {/* 영상 view and 업로드시간 */}
          <span className="video__data">0 - views {video.updatedAt}</span>
        </li>
      );
    });

  return (
    <section className="home__page">
      <h1 className="title">Recommended</h1>
      <ul className="video__container">{renderVideos()}</ul>
    </section>
  );
}

export default withRouter(HomePage);

// 플레이 시간 변환기
function timeConverter(duration) {
  if (+duration >= 60) {
    return `${duration / 60} : ${duration % 60}`;
  }
  return `${duration % 60}초`;
}
