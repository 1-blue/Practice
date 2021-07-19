import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

export default function (prevState = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...prevState,
        loginData: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...prevState,
        userData: action.payload,
      };

    case REGISTER_USER:
      return {
        ...prevState,
        registerData: action.payload,
      };

    case AUTH_USER:
      return {
        ...prevState,
        userData: action.payload,
      };

    default:
      return prevState;
  }
}
