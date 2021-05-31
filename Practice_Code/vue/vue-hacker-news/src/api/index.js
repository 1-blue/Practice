import axios from 'axios';

const config = {
  hackerNewBaseUrl: "https://api.hnpwa.com/v0/",
}

// news, jobs. ask데이터 받아옴
async function fetchList(name) {
  try {
    const list = await axios.get(`${config.hackerNewBaseUrl}${name}/1.json`);
    return list.data;
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
  fetchList,
  fetchUserInfo,
  fetchItem
}