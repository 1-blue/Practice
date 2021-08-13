import { apiDialogflowEvent, apiDialogflowText } from "@/api/index";
import { DIALOGFLOW_EVENT, DIALOGFLOW_TEXT, MY_TEXT } from "./types";

// 이벤트
export async function dialogflowEvent(body, who) {
  const data = await apiDialogflowEvent(body);

  return {
    type: DIALOGFLOW_EVENT,
    payload: {
      who,
      contents: data.fulfillmentText,
    },
  };
}

// 텍스트
export async function dialogflowText(body, who) {
  const data = await apiDialogflowText(body);

  return {
    type: DIALOGFLOW_TEXT,
    payload: {
      who,
      contents: data.fulfillmentText,
    },
  };
}

// 내채팅 기록
export async function myText(contents, who) {
  return {
    type: MY_TEXT,
    payload: {
      who,
      contents,
    },
  };
}
