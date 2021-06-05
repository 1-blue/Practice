import axios from "axios";

const baseUrl = "http://localhost:300";

async function registerUser(userData) {
  try {
    return await axios.post(`${baseUrl}/signup`, userData);
  } catch (error) {
    if (error.message.includes("409")) {
      // 이미 가입된 아이디
      throw new Error(409);
    } else if (error.message.includes("500")) {
      // 서버측 에러
      throw new Error(500);
    } else {
      // 잘못된 url경로로 전송
      throw new Error(error);
    }
  }
}

export { registerUser };
