import axios from 'axios';

const config = {
  hackerNewBaseUrl: "https://api.hnpwa.com/v0/",
}

// news관련정보
async function fetchNews() {
  try {
    const { data } = await axios.get(`${config.hackerNewBaseUrl}news/1.json`);
    return data;
  } catch (error) {
    throw error;
  }
}

// ask관련정보
async function fetchAsk() {
  try {
    const ask = await axios.get(`${config.hackerNewBaseUrl}ask/1.json`);
    return ask.data;
  } catch (error) {
    throw error;
  }
}

// jobs관련정보
async function fetchJobs() {
  try {
    const jobs = await axios.get(`${config.hackerNewBaseUrl}jobs/1.json`);
    return jobs.data;
  } catch (error) {
    throw error;
  }
}

// user관련정보
async function fetchUserInfo(username) {
  try {
    const userInfo = await axios.get(`${config.hackerNewBaseUrl}user/${username}.json`);
    return userInfo.data;
  } catch (error) {
    throw error;
  }
}

// ask상세페이지정보
async function fetchItem(id) {
  try {
    const item = await axios.get(`${config.hackerNewBaseUrl}item/${id}.json`);
    return item.data;
  } catch (error) {
    throw error;
  }
}

export {
  fetchNews,
  fetchAsk,
  fetchJobs,
  fetchUserInfo,
  fetchItem
}