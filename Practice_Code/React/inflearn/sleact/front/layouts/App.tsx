import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

const Login = loadable(() => import("@pages/Login"));
const Register = loadable(() => import("@pages/Register"));

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

export default App;
