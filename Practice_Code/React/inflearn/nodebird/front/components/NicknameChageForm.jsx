import React, { useCallback } from "react";
import { Form, Input } from "antd";

function NicknameChageForm() {
  const onSearch = useCallback(value => console.log(value), []);

  // UserProfile에서 닉네임변경폼
  return (
    <Form>
      <Input.Search
        placeholder="input a nickname to change"
        allowClear
        addonBefore="닉네임"
        enterButton="수정"
        size="large"
        onSearch={onSearch}
      />
    </Form>
  );
}

export default NicknameChageForm;
