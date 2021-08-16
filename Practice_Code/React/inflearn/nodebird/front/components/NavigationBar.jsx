import React, { useCallback } from "react";
import Link from "next/link";
import { Menu, Input } from "antd";
import styled from "styled-components";

const SearchInput = styled(Input.Search)`
  width: 220px;
  vertical-align: middle;
`;

function NavigationBar() {
  // 해시태그검색
  const onSearch = useCallback(value => console.log(value), []);

  return (
    <nav>
      <Menu mode="horizontal">
        {/* 메인페이지 */}
        <Menu.Item key="main">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>

        {/* 프로필페이지 */}
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>

        {/* 해쉬태그검색창 */}
        <Menu.Item key="input">
          <SearchInput placeholder="input search hashtag" allowClear onSearch={onSearch} />
        </Menu.Item>

        {/* 회원가입페이지 */}
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}

export default NavigationBar;
