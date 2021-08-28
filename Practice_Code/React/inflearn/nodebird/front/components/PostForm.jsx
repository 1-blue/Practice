import React, { useRef, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import { addPostRequest } from "../store/actions";
import styled from "styled-components";

const UploadBtnWrapper = styled(Button)`
  float: right;
`;

function PostForm() {
  const dispatch = useDispatch();
  const { _id: userId } = useSelector(state => state.userReducer.me);
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
  }, []);

  // 게시글 업로드
  const onClickPostUploadBtn = useCallback(() => {
    // 전달할것: 이미지들, 게시글내용
    // console.log(imageInput.current); //임시
    dispatch(addPostRequest({ userId, content }));
  }, [imageInput.current, content, userId]);

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
      <input type="file" multiple hidden ref={imageInput} />

      {/* 게시글 이미지 업로드 버튼 */}
      <Button onClick={onClickImageUploadBtn}>이미지업로드</Button>

      {/* 게시글 업로드 버튼 */}
      <UploadBtnWrapper type="primary" htmlType="submit" loading={isAddPostLoading}>
        업로드
      </UploadBtnWrapper>
    </Form>
  );
}

export default PostForm;
