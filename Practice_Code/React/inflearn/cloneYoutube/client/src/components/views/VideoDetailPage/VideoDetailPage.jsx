import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { withRouter } from "react-router";

import {
  apiFetchVideo,
  apiFetchAllVideo,
  apiAppendSubscribe,
  apiFetchSubscribeNumber,
  apiClickLike,
  apiClickDislike,
  apiFetchVideoLike,
  apiFetchVideoDislike,
} from "@/api";

import VideoInfo from "@/components/common/VideoInfo/VideoInfo";
import Comments from "@/components/common/Comments/Comments";
import Like from "@/components/common/Like/Like";
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
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
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

  // 좋아요 관련
  useEffect(async () => {
    await fetchLike();
  }, [video]);

  // 좋아요, 싫어요 패치
  const fetchLike = async () => {
    if (!video) return;

    setLike(await apiFetchVideoLike(video._id));
    setDislike(await apiFetchVideoDislike(video._id));
  };

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

  // 좋아요 or 싫어요
  const onClickLike = async e => {
    switch (e.target.name) {
      case "like":
        await apiClickLike({ videoId: video._id, userId: user._id });
        break;
      case "dislike":
        await apiClickDislike({ videoId: video._id, userId: user._id });
        break;

      default:
        break;
    }
    await fetchLike();
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
            <pre>{video.description}</pre>

            <hr />

            {/* 댓글 */}
            <Comments videoId={video._id} />

            {/* 구독버튼 */}
            {user && videoWriter && (
              <Subscribe
                isSubscribe={isSubscribe}
                SubscribeNumber={SubscribeNumber}
                onClickSubscribe={onClickSubscribe}
              />
            )}

            {/* 좋아요 */}
            <div className="video__like__container">
              <Like onClickLike={onClickLike} like={like} dislike={dislike} />
            </div>
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
