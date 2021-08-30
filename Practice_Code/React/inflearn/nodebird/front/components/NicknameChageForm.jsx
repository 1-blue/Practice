import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Form, Input } from "antd";

import { userChangeNicknameRequest } from "../store/actions";

function NicknameChageForm() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const onChangeContent = useCallback(e => setContent(e.target.value), []);

  const onSubmit = useCallback(() => {
    dispatch(userChangeNicknameRequest(content));
  }, [content]);

  // UserProfile에서 닉네임변경폼
  return (
    <Form>
      <Input.Search
        placeholder="input a nickname to change"
        allowClear
        addonBefore="닉네임"
        enterButton="수정"
        size="large"
        onChange={onChangeContent}
        onSearch={onSubmit}
        value={content}
      />
    </Form>
  );
}

export default NicknameChageForm;
