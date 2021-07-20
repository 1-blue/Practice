/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import { apiFetchVideo } from "@/api";

import "./VideoDetailPage.css";

function VideoDetailPage({ match }) {
  const [video, setVideo] = useState({});

  useEffect(async () => {
    const response = await apiFetchVideo(match.params.videoId);

    setVideo(response);
  }, []);

  return (
    <section className="video__detail">
      <h1 className="title">VideoDetailPage</h1>
      {video && <video src={`http://localhost:3000/uploads/videos/${video.videoName}`} controls className="video" />}
    </section>
  );
}

export default withRouter(VideoDetailPage);
