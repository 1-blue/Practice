import React, { useState, useEffect } from "react";

import { timeFormat } from "@/utils/filter";

import Thumbnail from "@/components/common/Thumbnail/Thumbnail";

import { apiFetchViews } from "@/api";

function SideVideo({ video }) {
  const [views, setViews] = useState(0);

  useEffect(async () => {
    setViews(await apiFetchViews(video._id));
  }, []);

  return (
    <li className="side__video">
      {/* 영상링크 */}
      <Thumbnail video={video} width="150" />

      <section className="side__video__info">
        <span className="side__video__title">{video.title}</span>
        <span className="side__video__writer__name">{video.writer.name}</span>
        <span className="side__video__data">
          조회수 {views} • {timeFormat(video.updatedAt)}
        </span>
      </section>
    </li>
  );
}

export default SideVideo;
