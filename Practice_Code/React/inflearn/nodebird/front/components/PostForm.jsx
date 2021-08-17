import React, { useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { addPost } from "../store/actions";
import styled from "styled-components";

const UploadBtnWrapper = styled(Button)`
  float: right;
`;

function PostForm() {
  const dispatch = useDispatch();
  const imageInput = useRef(null);
  const [text, setText] = useState("");

  // 텍스트수정
  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);

  // 이미지 업로드
  const onClickImageUploadBtn = useCallback(() => {
    imageInput.current.click();
  }, []);

  // 게시글 업로드
  const onClickPostUploadBtn = useCallback(() => {
    // 전달할것: 이미지들, 게시글내용
    console.log(imageInput.current); //임시
    console.log(text); // 임시
    dispatch(addPost());
  }, [imageInput.current, text]);

  return (
    <Form encType="multipart/form-data" onFinish={onClickPostUploadBtn}>
      {/* 게시글 텍스트 */}
      <Input.TextArea
        autoSize={{ minRows: 4, maxRows: 8 }}
        placeholder="무슨일이 있었는지 기록해주세요!"
        onChange={onChangeText}
      ></Input.TextArea>

      {/* 게시글 이미지 업로드 input */}
      <input type="file" multiple hidden ref={imageInput} />

      {/* 게시글 이미지 업로드 버튼 */}
      <Button onClick={onClickImageUploadBtn}>이미지업로드</Button>

      {/* 게시글 업로드 버튼 */}
      <UploadBtnWrapper type="primary" htmlType="submit">
        업로드
      </UploadBtnWrapper>
    </Form>
  );
}

export default PostForm;
