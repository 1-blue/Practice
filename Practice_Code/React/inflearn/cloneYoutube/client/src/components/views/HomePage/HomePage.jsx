import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import { apiFetchAllVideo } from "@/api";

import HomeThumbnail from "./HomeThumbnail/HomeThumbnail";

import "./homePage.css";

function HomePage() {
  const [videos, setVideos] = useState([]);

  // 저장된 모든 비디오 정보 가져오기
  useEffect(async () => {
    const data = await apiFetchAllVideo();

    setVideos(data);
  }, []);

  return (
    <section className="home__page">
      <h1 className="title" style={{ paddingBottom: "2rem", borderBottom: "4px solid black" }}>
        CloneYube
      </h1>
      <ul className="video__container">
        {videos && videos.map(video => <HomeThumbnail key={video._id} video={video} />)}
      </ul>
    </section>
  );
}

export default withRouter(HomePage);
