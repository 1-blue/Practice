import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// 컴포넌트
import MainPage from "@/components/views/MainPage/MainPage";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
}
