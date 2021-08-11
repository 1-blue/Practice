import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// 컴포넌트
import NavBar from "@/components/views/NavBar/NavBar";
import MainPage from "@/components/views/MainPage/MainPage";
import LoginPage from "@/components/views/LoginPage/LoginPage";
import RegisterPage from "@/components/views/RegisterPage/RegisterPage";
import MovieDetailPage from "@/components/views/MovieDetailPage/MovieDetailPage";

// 테스트용
import TestPage from "@/components/views/TestPage/TestPage";

// hoc ( 로그인했는지 안했는지 판단 및 로그인시 로그인유저정보 리덕스에 저장 )
import Auth from "./hoc/auth";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Auth(MainPage, false)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/movie/:movieId" component={Auth(MovieDetailPage, false)} />
        <Route exact path="/test" component={Auth(TestPage, true)} />
      </Switch>
    </BrowserRouter>
  );
}
