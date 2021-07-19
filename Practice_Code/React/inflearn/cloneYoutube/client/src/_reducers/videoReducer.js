import { SUBMIT_VIDEO } from "../_actions/types";

export default function (prevState = {}, action) {
  switch (action.type) {
    case SUBMIT_VIDEO:
      return {
        ...prevState,
        videoData: action.payload,
      };

    default:
      return prevState;
  }
}
