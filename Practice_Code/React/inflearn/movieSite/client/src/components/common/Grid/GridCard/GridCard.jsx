import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

// css
import "./GridCard.css";

function GridCard({ item, kinds }) {
  const [imageSrc, setImageSrc] = useState(null);

  // 어디에 사용할지에 따라 path지정
  useEffect(() => {
    let tempImagePath = "";

    switch (kinds) {
      case "main":
        tempImagePath = item.poster_path;
        break;
      case "detail":
        tempImagePath = item.profile_path;
        break;
      default:
        break;
    }
    setImageSrc(`${process.env.REACT_APP_API_IMAGE_URL}w500${tempImagePath}`);
  }, []);

  // 어디에 사용할지에 따라서 링크 줄지말지 결정
  const card = () => {
    switch (kinds) {
      case "main":
        return (
          <a href={`/movie/${item.id}`}>
            <img src={imageSrc} alt="이미지 존재하지않음" className="movie__image" />
          </a>
        );
      case "detail":
        return <img src={imageSrc} alt="이미지 존재하지않음" className="movie__image" />;
      default:
        break;
    }
  };

  return <section className="grid__card">{card()}</section>;
}

export default withRouter(GridCard);
