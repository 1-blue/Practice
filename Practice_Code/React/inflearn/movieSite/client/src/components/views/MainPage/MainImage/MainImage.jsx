import React from "react";
import { withRouter } from "react-router";

import "./MainImage.css";

function MainImage({ image, title, description }) {
  return (
    <section className="main__image" style={{ backgroundImage: `url("${image}")` }}>
      {/* 메인이미지의 텍스트들의 위치를 조정하기위한 태그 */}
      <div className="main__image__wrapper">
        {/* 영화제목 */}
        <h1 className="main__image__title">
          <strong>{title}</strong>
        </h1>

        {/* 영화줄거리 */}
        <p className="main__image__description">
          <strong>{description}</strong>
        </p>
      </div>
    </section>
  );
}

export default withRouter(MainImage);
