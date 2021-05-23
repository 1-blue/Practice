const $balls = document.querySelector(".balls");
const winningNumbers = getRandomBalls();
let count = 0;

for(let winningNumber of winningNumbers){
  count++;
  let $$ball = document.createElement("div");
  let $$ballText = document.createElement("div");

  // 공색깔 지정
  switch (Math.floor(winningNumber / 10)) {
    case 0:
      $$ball.classList.add("ball__yellow");
      break;
    case 1:
      $$ball.classList.add("ball__blue");
      break;
    case 2:
      $$ball.classList.add("ball__red");
      break;
    case 3:
      $$ball.classList.add("ball__black");
      break;
    case 4:
      $$ball.classList.add("ball__green");
      break;
    default:
      alert("에러요 에러다 에러 : " + winningNumber);
      break;
  }
  // 공텍스트
  $$ballText.textContent = winningNumber
  $$ballText.classList.add("ball__text");

  // 공
  $$ball.appendChild($$ballText);
  $$ball.classList.add("ball");

  // 공리스트
  setTimeout(() => {
    $balls.appendChild($$ball);
  }, 1000 * count);
}

// 랜덤공 7개 뽑기
function getRandomBalls() {
  const candidates = Array(45).fill().map((v, i) => i + 1);
  let randomIndex = -1;
  const tempNumbers = [];

  for(let i = 0; i<7; i++){
    randomIndex = Math.floor(Math.random() * candidates.length) + 1;

    tempNumbers.push(candidates[randomIndex]);
    candidates.splice(randomIndex, 1);
  }

  return tempNumbers;
}