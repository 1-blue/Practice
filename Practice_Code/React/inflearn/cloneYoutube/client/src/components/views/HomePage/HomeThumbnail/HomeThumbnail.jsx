import React from "react";

import Thumbnail from "@/components/common/Thumbnail/Thumbnail";
import VideoInfo from "@/components/common/VideoInfo/VideoInfo";

function HomeThumbnail({ video }) {
  return (
    <li>
      {/* 영상링크 */}
      <Thumbnail video={video} />

      {/* 비디오 정보 */}
      <VideoInfo video={video} />
    </li>
  );
}

export default HomeThumbnail;
