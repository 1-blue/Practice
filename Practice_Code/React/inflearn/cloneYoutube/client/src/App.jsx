import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// 컴포넌트
import NavBar from "@/components/views/NavBar/NavBar";
import HomePage from "@/components/views/HomePage/HomePage";
import BlogsPage from "@/components/views/BlogsPage/BlogsPage";
import LoginPage from "@/components/views/LoginPage/LoginPage";
import RegisterPage from "@/components/views/RegisterPage/RegisterPage";
import VideoUploadPage from "@/components/views/VideoUploadPage/VideoUploadPage";

// hoc ( 로그인했는지 안했는지 판단 및 로그인시 로그인유저정보 리덕스에 저장 )
import Auth from "./hoc/auth";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Auth(HomePage, null)} />
        <Route exact path="/blogs" component={Auth(BlogsPage, false)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
      </Switch>
    </BrowserRouter>
  );
}
