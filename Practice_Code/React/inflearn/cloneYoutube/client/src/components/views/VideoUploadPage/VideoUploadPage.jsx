/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from "react";
import { withRouter } from "react-router";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

// 영상만 업로드
import { apiUploadVideo, apiCreateThumbnail } from "@/api";

// 영상과 관련정보 제출
import { submitVideo } from "@/_actions/videoAction";

// css
import "./videoUpload.css";

const Privacy = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const Category = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Auto & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

function VideoUploadPage(props) {
  const [videoName, setVideoName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("Private");
  const [category, setCategory] = useState("Film & Animation");
  const [thumbnailName, setThumbnailName] = useState("");
  const [duration, setDuration] = useState();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.userData);

  // 영상 드랍다운
  const onDrop = useCallback(async acceptedFiles => {
    // 영상만 서버에 미리 저장후 저장한 이름 가져오기
    const data = await apiUploadVideo(acceptedFiles);

    // 영상 저장 실패
    if (!data.result) return alert(data.message);

    // 영상 저장 성공시 영상이름 따로저장
    setVideoName(data.videoName);

    // 썸네일 생성
    const response = await apiCreateThumbnail(data.videoName);

    setThumbnailName(response.thumbnailName);
    setDuration(response.videoDuration);
  }, []);

  // 드랍존 관련
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // 비디오 업로드
  const onUploadVideo = async e => {
    e.preventDefault();

    if (!videoName) return alert("업로드할 영상을 선택해주세요");

    const response = await dispatch(
      submitVideo({
        writer: user._id,
        title,
        description,
        videoName,
        privacy,
        category,
        duration,
        thumbnailName,
      }),
    );

    // 로그인 성공 or 실패 메시지 전송
    alert(response.payload.message);

    // 성공시 기본페이지로 이동
    if (response.payload.result) {
      props.history.push("/");
    }
  };

  // input
  const onChangeInput = e => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;

      default:
        break;
    }
  };
  // select
  const onChangeSelect = e => {
    switch (e.target.name) {
      case "privacy":
        setPrivacy(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <section className="video__upload">
      <h1 className="title" style={{ marginBottom: "1rem" }}>
        👉 Upload Video 👈
      </h1>

      <form className="video__form" onSubmit={onUploadVideo}>
        {/* 드랍존과 썸네일 */}
        <section className="video__section">
          {/* 드랍존 */}
          <section className="video__dropzone" {...getRootProps()}>
            <input className="video__input" {...getInputProps()} />
            {isDragActive ? <span>파일을 여기에다 놓으세요</span> : <span style={{ fontSize: "4rem" }}>+</span>}
          </section>

          {/* 썸네일 */}
          <section className="video__thumbnail">
            {thumbnailName && <img src={`http://localhost:3000/uploads/thumbnails/${thumbnailName}`} alt="썸네일" />}
          </section>
        </section>

        {/* 영상 제목 */}
        <label htmlFor="video__title">
          Title
          <input type="text" id="video__title" value={title} name="title" onChange={onChangeInput} />
        </label>

        {/* 영상 설명 */}
        <label htmlFor="video__description">
          Description
          <textarea
            type="text"
            id="video__description"
            value={description}
            name="description"
            onChange={onChangeInput}
          />
        </label>

        {/* 영상 관련 select-option */}
        <section className="select">
          {/* 영상 공개범위 */}
          <label htmlFor="privacy">
            공개범위
            <select id="privacy" onChange={onChangeSelect} name="privacy">
              {Privacy.map(v => (
                <option key={v.value} value={v.vaule}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>

          {/* 카테고리 */}
          <label htmlFor="category">
            카테고리
            <select id="category" onChange={onChangeSelect} name="category">
              {Category.map(v => (
                <option key={v.value} value={v.vaule}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
        </section>

        {/* 제출버튼 */}
        <button type="submit" className="video__upload__btn">
          upload
        </button>
      </form>
    </section>
  );
}

export default withRouter(VideoUploadPage);
