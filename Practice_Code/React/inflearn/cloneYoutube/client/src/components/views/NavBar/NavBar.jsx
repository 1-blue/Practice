import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { logoutUser } from "@/_actions/userAction";

// component
import LeftMenu from "./Menu/LeftMenu";
import RightMenu from "./Menu/RightMenu";

// css
import "@/css/navbar.css";

export default function NavBar() {
  // useSelector너무 많이 실행되는데 방법을 모르겠음
  const user = useSelector(state => state.userReducer.userData);
  const [visible, setVisible] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowNav, setIsShowNav] = useState(true);
  const dispatch = useDispatch();

  // 로그인 유무에 따라 보여줄 네이게이션 변경
  useEffect(() => {
    if (!user) return;

    if (user._id) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [user]);

  // 768px이하일경우 햄버그메뉴 보여주도록 설정
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isShowMenu]);

  // 로그아웃클릭
  const onClickLogout = async () => {
    await dispatch(logoutUser());
  };

  // 현 화면 사이즈를 기준으로 햄버그메뉴 보여줄지말지 결정
  const handleResize = () => {
    if (+window.innerWidth > 768 && isShowNav === false) setIsShowNav(true);
    if (+window.innerWidth <= 768 && isShowMenu === false) return setIsShowMenu(true);
    if (+window.innerWidth > 768 && isShowMenu === true) return setIsShowMenu(false);
  };

  // 햄버그메뉴클릭시 실행 ( 네비게이션메뉴 display: none; toggle설정 )
  const onClickMenu = () => (isShowNav ? setIsShowNav(false) : setIsShowNav(true));

  return (
    <ul className="navigation__bar">
      {/* 네비게이션 좌측영역 */}
      <LeftMenu isShowMenu={isShowMenu} onClickMenu={onClickMenu} isShowNav={isShowNav} />

      {/* 네비게이션 우측영역 */}
      <RightMenu visible={visible} onClickLogout={onClickLogout} isShowNav={isShowNav} />
    </ul>
  );
}
