import { apiSubmitVideo } from "../api/index";
import { SUBMIT_VIDEO } from "./types";

// 영상 업로드
// eslint-disable-next-line import/prefer-default-export
export async function submitVideo(body) {
  const data = await apiSubmitVideo(body);

  return {
    type: SUBMIT_VIDEO,
    payload: data,
  };
}
