function init() {
  const tempData = [];
  for(let i = 0; i < localStorage.length; i++){
    if(localStorage.key(i) === "loglevel:webpack-dev-server"){
      continue;
    }
    // localStorage에 string형식으로 object데이터가 들어가 있음
    // name, isCheck들어있어서 JSON.parse한것
    tempData.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  return tempData;
}

export {
  init,
}