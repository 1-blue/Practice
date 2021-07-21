/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";

function Video({ video }) {
  return <video src={`http://localhost:3000/uploads/videos/${video.videoName}`} controls className="video" />;
}

export default Video;
