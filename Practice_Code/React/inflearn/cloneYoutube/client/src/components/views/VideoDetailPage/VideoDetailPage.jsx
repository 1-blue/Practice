import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import { apiFetchVideo, apiFetchAllVideo } from "@/api";

import VideoInfo from "@/components/common/VideoInfo/VideoInfo";
import Video from "./Video/Video";
import SideVideo from "./SideVideo/SideVideo";

import "./VideoDetailPage.css";

function VideoDetailPage({ match }) {
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  // 영상정보가져오기
  useEffect(async () => {
    // 현재 페이지 영상정보
    setVideo(await apiFetchVideo(match.params.videoId));

    // 사이드바로 사용할 영상정보
    setVideos(await apiFetchAllVideo());
  }, []);

  return (
    <section className="video__detail__container">
      {video && (
        <div className="video__detail">
          <Video video={video} />
          <VideoInfo video={video} />

          {/* 영상 내용 */}
          <p>{video.description}</p>

          {/* 구독 및 좋아요 */}

          {/* 댓글 */}
        </div>
      )}
      {/* {video && <Video video={video} />} */}

      {videos && (
        <ul className="side__video__container">
          {videos.map(v => (
            <SideVideo key={v._id} video={v} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default withRouter(VideoDetailPage);
