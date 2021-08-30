import React from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

// component
import AppLayout from "../components/common/AppLayout";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  const { isLoggedIn } = useSelector(state => state.userReducer);

  if (isLoggedIn) {
    alert("로그아웃후 접근해주세요!");
    Router.push("/");
  }

  return (
    <>
      {!isLoggedIn && (
        <AppLayout>
          <SignupForm />
        </AppLayout>
      )}
    </>
  );
};

export default Signup;
