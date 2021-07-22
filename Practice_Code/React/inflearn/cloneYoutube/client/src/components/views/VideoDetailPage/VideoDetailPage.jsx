import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { withRouter } from "react-router";

import { apiFetchVideo, apiFetchAllVideo, apiAppendSubscribe, apiFetchSubscribeNumber } from "@/api";

import VideoInfo from "@/components/common/VideoInfo/VideoInfo";
import Video from "./Video/Video";
import SideVideo from "./SideVideo/SideVideo";
import Subscribe from "./Subscribe/Subscribe";

import "./VideoDetailPage.css";

function VideoDetailPage({ match }) {
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoWriter, setVideoWriter] = useState("");
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const user = useSelector(state => state.userReducer.userData);

  // 영상정보가져오기
  useEffect(async () => {
    // 현재 페이지 영상정보
    setVideo(await apiFetchVideo(match.params.videoId));

    // 사이드바로 사용할 영상정보
    setVideos(await apiFetchAllVideo());
  }, []);

  // 구독기능에 사용할 데이터
  useEffect(async () => {
    if (!video) return;
    if (!user) return;

    // 현재 영상 주인
    setVideoWriter(video.writer._id);

    // 구독자들
    const subscribes = await apiFetchSubscribeNumber(video.writer._id);

    // 현 구독자수
    setSubscribeNumber(subscribes.length);

    // 내가 구독했는지 여부
    setIsSubscribe(subscribes.some(subscribe => subscribe.userTo === user._id));
  }, [video, user]);

  // 구독버튼클릭
  const onClickSubscribe = async () => {
    const response = await apiAppendSubscribe({ writerId: videoWriter, userId: user._id });

    // 구독 or 구독취소에 성공했다면 데이터 reFetch
    if (response.result) {
      // 구독자들
      const subscribes = await apiFetchSubscribeNumber(video.writer._id);

      // 현 구독자수
      setSubscribeNumber(subscribes.length);

      // 내가 구독했는지 여부
      setIsSubscribe(subscribes.some(subscribe => subscribe.userTo === user._id));
    }
  };

  return (
    <section className="video__detail__container">
      {video && (
        <section className="video__detail">
          {/* 영상 */}
          <Video video={video} />

          {/* 영상부가정보 */}
          <section className="video__detail__info">
            {/* 영상정보 */}
            <VideoInfo video={video} />

            {/* 영상 내용 */}
            <p>{video.description}</p>

            {/* 구독버튼 */}
            {user && videoWriter && (
              <Subscribe
                isSubscribe={isSubscribe}
                SubscribeNumber={SubscribeNumber}
                onClickSubscribe={onClickSubscribe}
              />
            )}

            {/* 좋아요 */}

            {/* 댓글 */}
          </section>
        </section>
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
