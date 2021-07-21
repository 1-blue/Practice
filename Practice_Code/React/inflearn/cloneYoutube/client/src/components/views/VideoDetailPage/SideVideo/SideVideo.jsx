import React from "react";

import { timeFormat } from "@/utils/filter";

import Thumbnail from "@/components/common/Thumbnail/Thumbnail";

function SideVideo({ video }) {
  return (
    <li className="side__video">
      {/* 영상링크 */}
      <Thumbnail video={video} width="150" />

      <section className="side__video__info">
        <span className="side__video__title">{video.title}</span>
        <span className="side__video__writer__name">{video.writer.name}</span>
        <span className="side__video__data">조회수 0 • {timeFormat(video.updatedAt)}</span>
      </section>
    </li>
  );
}

export default SideVideo;
