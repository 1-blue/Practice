import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { logoutUser } from "@/_actions/userAction";

// component
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

// css
import "@/css/navbar.css";

export default function NavBar() {
  // useSelector너무 많이 실행되는데 방법을 모르겠음
  const user = useSelector(state => state.userReducer.userData);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 유무에 따라 보여줄 네이게이션 변경
    if (!user) return;

    if (user._id) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [user]);

  const onClickLogout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <ul className="navigation__bar">
      {/* 네비게이션 좌측영역 */}
      <LeftMenu />

      {/* 네비게이션 우측영역 */}
      <RightMenu visible={visible} onClickLogout={onClickLogout} />
    </ul>
  );
}
