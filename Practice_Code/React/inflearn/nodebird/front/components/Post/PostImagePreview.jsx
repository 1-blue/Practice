import React, { useCallback } from "react";
import { Image } from "antd";
import PropsType from "prop-types";

function PostImagePreview({ images }) {
  // 조건처리
  // 1. 1개일때 크게보여주기
  // 2. 5개이상일때 4개만보여주고 클릭시 추가로 보여주기

  // 이미지 개수에 따른 스타일적용
  const containerStyle = useCallback(() => {
    switch (images.length) {
      case 1:
        return { display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridGap: "2px", marginTop: "10px" };

      default:
        return { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "2px", marginTop: "10px" };
    }
  }, [images]);

  // 이미지 개수에 따른 배치 및 hover텍스트 변경
  const imageProcessing = useCallback(() => {
    switch (images.length) {
      case 1:
        return (
          <Image
            height={"100%"}
            src={images[0].src}
            alt="작성자가 올린 이미지"
            preview={{ mask: "자세히 보기" }}
          ></Image>
        );
      case 2:
      case 3:
      case 4:
        return (
          <Image.PreviewGroup>
            {images.map(image => (
              <Image
                key={image.src}
                height={"100%"}
                src={image.src}
                alt="작성자가 올린 이미지"
                preview={{ mask: "자세히 보기" }}
              ></Image>
            ))}
          </Image.PreviewGroup>
        );

      default:
        return (
          <Image.PreviewGroup>
            {images.map((image, index) => {
              // 최초 4개 제외하고 display: none;
              if (index >= 4) {
                return (
                  <Image key={image.src} height={"200px"} src={image.src} alt="작성자가 올린 이미지" hidden></Image>
                );
              }

              // 마지막이미지의 hover텍스트 변경
              if (images.length >= 4 && index === 3) {
                return (
                  <Image
                    key={image.src}
                    height={"100%"}
                    src={image.src}
                    alt="작성자가 올린 이미지"
                    preview={{ mask: `${images.length - 4}개 더보기` }}
                  ></Image>
                );
              }

              // 그 외에 이미지
              return (
                <Image
                  key={image.src}
                  height={"100%"}
                  src={image.src}
                  alt="작성자가 올린 이미지"
                  preview={{ mask: "자세히 보기" }}
                ></Image>
              );
            })}
          </Image.PreviewGroup>
        );
    }
  }, [images]);

  return <div style={containerStyle()}>{imageProcessing()}</div>;
}

PostImagePreview.prototype = {
  images: PropsType.arrayOf(PropsType.object).isRequired,
};

export default PostImagePreview;
