import axios from "axios";

export function apiLogin(body) {
  return axios.post("/api/login", body);
}

export function apiLogout(body) {
  return axios.post("/api/login", body);
}
