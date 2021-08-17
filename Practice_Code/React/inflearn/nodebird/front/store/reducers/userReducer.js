import { USER_LOGIN, USER_LOGOUT } from "../types";

const initState = {
  me: {
    isLoggedIn: false,
    data: null,
  },
};

function userReducer(prevState = initState, { type, data }) {
  switch (type) {
    case USER_LOGIN:
      return {
        ...prevState,
        me: {
          isLoggedIn: true,
          data,
        },
      };
    case USER_LOGOUT:
      return {
        ...prevState,
        me: {
          isLoggedIn: false,
          data,
        },
      };

    default:
      return prevState;
  }
}

export default userReducer;
