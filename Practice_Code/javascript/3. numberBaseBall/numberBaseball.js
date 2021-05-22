const $chance = document.querySelector(".chance");
const $errorMsg = document.querySelector(".errorMsg");
const $input = document.querySelector("input");
const $button = document.querySelector("button");
const $result = document.querySelector(".result");
const gameState = {
  chance: 10,
  strike: 0,
  ball: 0,
  answer: getRandomNumber(),
}

// 엔터키 새로고침막기
$input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    excute();
  }
});

// 4자리 이상 입력못하게
$input.addEventListener("input", e => {
  if ($input.value.length >= 4) {
    $input.value = $input.value.slice(0, 4);
  }
});

$button.addEventListener("click", () => {
  excute();
});


function init() {
  gameState.chance = 10;
  gameState.strike = 0;
  gameState.ball = 0;
  gameState.answer = getRandomNumber();
  $result.innerHTML = "";
  $input.value = "";
}

function getRandomNumber() {
  const numberArray = Array(10).fill().map((v, i) => i);
  const answer = [];
  let randomIndex = -1;

  for (let i = 0; i < 4; i++) {
    randomIndex = Math.floor(Math.random() * numberArray.length);
    answer.push(String(numberArray[randomIndex]));
    numberArray.splice(randomIndex, 1);     // 뽑은숫자 후보에서 제거
  }

  return answer;
}

function excute() {
  const inputArray = $input.value.split("");
  const tempSet = new Set(inputArray);    // 중복제거

  if (tempSet.size !== 4) {   // 숫자중복시 실행
    $errorMsg.textContent = "숫자가 중복됩니다. 다시 입력해주세요";
    setTimeout(() => $errorMsg.textContent = "", 2000);
    $input.value = "";
    return;
  }
  else {    // 정상적인 입력일경우 실행
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (inputArray[i] === gameState.answer[j]) {    // 일치하는 숫자 존재하고
          if (i === j) {                                // 자리수까지 일치하면
            gameState.strike++;
          } else {
            gameState.ball++;
          }
        }
      }
    }
  }

  if (gameState.strike === 4) {
    alert("정답!, 게임을 다시시작합니다.");
    init();
    return;
  }

  if (gameState.chance <= 0) {
    alert(`실패!, 정답은 ${gameState.answer}입니다. \n게임을 다시시작합니다.`);
    init();
    return;
  }

  const $li = document.createElement("li");
  $li.textContent = `${gameState.chance}번째시도) 입력숫자: ${$input.value} || ${gameState.strike}스트라이크, ${gameState.ball}볼입니다.`;
  $result.appendChild($li)

  $input.value = "";
  gameState.chance--;
  gameState.strike = 0;
  gameState.ball = 0;
}