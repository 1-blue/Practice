import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

async function registerUser(userData) {
  try {
    return await instance.post("/signup", userData);
  } catch (error) {
    throw error.response;
  }
}

async function loginUser(loginData) {
  try {
    return await instance.post("/login", loginData);
  } catch (error) {
    throw error.response;
  }
}

export { registerUser, loginUser };
