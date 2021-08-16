import React, { useMemo } from "react";
import { List, Card, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import styled from "styled-components";

const ListWrapper = styled(List)`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;
const LoadMoreBtnWrapper = styled(Button)`
  margin: 10px 0;
  align-self: center;
`;

function FollowList({ data, header }) {
  // 스타일적용
  const gridWrapper = useMemo(() => ({ gutter: 4, xs: 2, md: 3, lg: 4, xl: 4, xxl: 4 }));

  // 팔로워 or 팔로잉 리스트 보여줌
  return (
    <ListWrapper
      grid={gridWrapper}
      dataSource={data}
      header={header}
      bordered
      size="small"
      loadMore={<LoadMoreBtnWrapper>더보기</LoadMoreBtnWrapper>}
      renderItem={item => (
        <List.Item>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta title={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}

FollowList.propTypes = {
  data: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
};

export default FollowList;
