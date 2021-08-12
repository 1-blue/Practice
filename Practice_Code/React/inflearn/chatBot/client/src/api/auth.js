import axios from "axios";

// axios인스턴스생성
const dialogflowInstance = axios.create({
  baseURL: "http://localhost:3000/api/dialogflow",
  withCredentials: true,
});

// 이벤트
export async function apiDialogflowEvent(body) {
  const { data } = await dialogflowInstance.post("/eventQuery", body);
  return data;
}

// 텍스트
export async function apiDialogflowText(body) {
  const { data } = await dialogflowInstance.post("/textQuery", body);
  return data;
}
