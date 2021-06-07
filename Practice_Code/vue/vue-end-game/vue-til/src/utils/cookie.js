function setToken(token) {
  const date = new Date(Date.now() + 3600);
  document.cookie = `til_token=${token}; Expires=${date}; path=/;`;
}

function setUserNickname(nickname) {
  const date = new Date(Date.now() + 3600);
  document.cookie = `til_nickname=${nickname}; Expires=${date}; path=/;`;
}

function getToken() {
  const cookies = cookieParser();

  return cookies["til_token"] ? cookies["til_token"] : null;
}

function getNickname() {
  const cookies = cookieParser();

  return cookies["til_nickname"] ? cookies["til_nickname"] : null;
}

function clearToken(token) {
  document.cookie = `til_token=${token}; Expires=${Date.now()}; path=/;`;
}

function clearNickname(nickname) {
  document.cookie = `til_nickname=${nickname}; Expires=${Date.now()}; path=/;`;
}

export {
  setToken,
  setUserNickname,
  getToken,
  getNickname,
  clearToken,
  clearNickname,
};

// 쿠키파서
function cookieParser() {
  const cookieArray = document.cookie.split(";");
  const cookieObject = {};

  cookieArray.forEach(v => {
    const tempArray = v.split("=");
    cookieObject[`${tempArray[0].trim()}`] = tempArray[1];
  });

  return cookieObject;
}
