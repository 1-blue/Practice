export function formatDate(value) {
  const date = new Date(value);

  // 년
  let year = date.getFullYear();

  // 월
  let month = date.getMonth() + 1;
  month = month >= 10 ? month : "0" + month;

  // 일
  let day = converter(date.getDate());

  // 시
  let hour = converter(date.getHours());

  // 분
  let minute = converter(date.getMinutes());

  // 초
  let second = converter(date.getSeconds());

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
}

function converter(value) {
  return value >= 10 ? value : "0" + value;
}
