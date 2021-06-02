let timeRecode = [];
let timerId;
let startTime;
const $clickBox = document.querySelector(".clickBox");
const $text = document.querySelector(".text");
const $result = document.querySelector(".result");

init();

$clickBox.addEventListener("click", e => {
  if(timeRecode.length === 5) {
    return;
  }

  const targetClassList = e.target.classList;
  if(targetClassList.contains("ready")){
    // 대기상태 -> 준비상태
    targetClassList.replace("ready", "waiting");
    $text.textContent = "화면이 빨간색이 되면 누르세요";
    timer(targetClassList);

  } else if(targetClassList.contains("waiting")) {
    // 준비상태 -> 게임오버
    clearTimeout(timerId);
    targetClassList.replace("waiting", "game__over");
    $text.textContent = "게임종료.. 다시하려면 새로고침해주세요";

  } else if(targetClassList.contains("start")) {
    // 시작상태 -> 대기상태
    targetClassList.replace("start", "waiting");
    $text.textContent = "화면이 빨간색이 되면 누르세요";
    timeRecode.push(Date.now() - startTime);
    if(timeRecode.length === 5) {
      gameEnd(targetClassList);
      return;
    }
    timer(targetClassList);
  }
});

function init() {
  $clickBox.classList.add("ready");
  $text.textContent = "시작하려면 누르세요";
  timeRecode = [];
  timerId = null;
  startTime = null;
}

function timer(targetClassList) {
  timerId = setTimeout(() => {
    targetClassList.replace("waiting", "start");
    startTime = Date.now();
    $text.textContent = "클릭하세요!";
  }, Math.floor(Math.random() * 3000) + 500);
}

function gameEnd(targetClassList) {
  clearTimeout(timerId);
  targetClassList.replace("start", "waiting");
  alert("게임종료");
  const responseSpeedSum = timeRecode.reduce((pv, cv) => pv += cv, 0);
  const responseSpeedAvg = responseSpeedSum / timeRecode.length;

  $text.textContent = "게임종료... 평균반응속도 : " + responseSpeedAvg;
}