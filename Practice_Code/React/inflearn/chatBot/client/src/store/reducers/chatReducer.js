import { DIALOGFLOW_EVENT, DIALOGFLOW_TEXT, MY_TEXT } from "../actions/types";

export default function (prevState = [], action) {
  switch (action.type) {
    case DIALOGFLOW_EVENT:
      return [...prevState, action.payload];

    case DIALOGFLOW_TEXT:
      return [...prevState, action.payload];

    case MY_TEXT:
      return [...prevState, action.payload];

    default:
      return prevState;
  }
}
