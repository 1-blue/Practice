import React, { useRef, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import { addPostRequest, uploadImagesRequest } from "../store/actions";
import styled from "styled-components";

const UploadBtnWrapper = styled(Button)`
  float: right;
`;

function PostForm() {
  const dispatch = useDispatch();
  const { _id: userId } = useSelector(state => state.userReducer.me);
  const { imagePaths } = useSelector(state => state.postReducer);
  const { isAddPostLoading, isAddPostDone } = useSelector(state => state.postReducer);
  const imageInput = useRef(null);
  const [content, setContent] = useState("");

  // 게시글 생성완료시 내용 비우기
  useEffect(() => {
    if (isAddPostDone) {
      setContent("");
    }
  }, [isAddPostDone]);

  // 텍스트수정
  const onChangeContent = useCallback(e => {
    setContent(e.target.value);
  }, []);

  // 이미지 업로드
  const onClickImageUploadBtn = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(e => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, file => {
      imageFormData.append("image", file);
    });

    dispatch(uploadImagesRequest(imageFormData));
  });

  // 게시글 업로드
  const onClickPostUploadBtn = useCallback(() => {
    dispatch(addPostRequest({ userId, content, imagePaths }));
  }, [content, userId, imagePaths]);

  return (
    <Form encType="multipart/form-data" onFinish={onClickPostUploadBtn}>
      {/* 게시글 텍스트 */}
      <Input.TextArea
        autoSize={{ minRows: 4, maxRows: 8 }}
        placeholder="무슨일이 있었는지 기록해주세요!"
        onChange={onChangeContent}
        value={content}
      ></Input.TextArea>

      {/* 게시글 이미지 업로드 input */}
      <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />

      {/* 게시글 이미지 업로드 버튼 */}
      <Button onClick={onClickImageUploadBtn}>이미지업로드</Button>

      {/* 게시글 업로드 버튼 */}
      <UploadBtnWrapper type="primary" htmlType="submit" loading={isAddPostLoading}>
        업로드
      </UploadBtnWrapper>

      <div>
        {imagePaths.map(imagePath => (
          <div key={imagePath} style={{ display: "inline-block" }}>
            <img src={`http://localhost:3000/images/${imagePath}`} alt={imagePath} style={{ width: "200px" }} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default PostForm;
