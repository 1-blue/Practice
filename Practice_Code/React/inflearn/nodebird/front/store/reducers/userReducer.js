import { USER_LOGIN, USER_LOGOUT } from "../types";

const initState = {
  user: {
    isLoggedIn: false,
    data: null,
  },
};

function userReducer(prevState = initState, { type, data }) {
  switch (type) {
    case USER_LOGIN:
      return {
        ...prevState,
        user: {
          isLoggedIn: true,
          data,
        },
      };
    case USER_LOGOUT:
      return {
        ...prevState,
        user: {
          isLoggedIn: false,
          data,
        },
      };

    default:
      return prevState;
  }
}

export default userReducer;
