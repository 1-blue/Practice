// 0, -141, -282

const RPC = {
  ROCK: 0,
  PAPER: -1,
  SCISSORS: -2,
};
const scoreCard = {
  Victory: [ 1, -2 ],
  Destroy: [ -1, 2 ],
  Draw: [ 0 ]
}
const FLAG = {
  PLAYING: 0,
  STOP: 1
}
let intervalTimerId;
let megTimerId;
let score;
let state;
let mixInterval = 50;       // 입력받아서 변경할 가능성 있기때문에 let
let matchCheckTime = 1000;  // 입력받아서 변경할 가능성 있기때문에 let
const IMAGE_INTERVAL = 141;
const $score = document.querySelector(".score");
const $msg = document.querySelector(".msg");
const $rpcImage = document.querySelector(".rpc__image");
const $rpcBtns = [];

init();
start();

function init() {
  intervalTimerId = null;
  score = 0;
  state = FLAG.PLAYING;
  $score.textContent = score;
  $rpcImage.style.backgroundPosition = "-141px 0px"

  $rpcBtns.push(document.querySelector(".rock__btn"));
  $rpcBtns.push(document.querySelector(".paper__btn"));
  $rpcBtns.push(document.querySelector(".scissors__btn"));

  for(let btn of $rpcBtns){
    btn.addEventListener("click", e => {
      if(state === FLAG.STOP) {
        return;
      }

      clearInterval(intervalTimerId);
      setTimeout(start, matchCheckTime);

      // 승패결정
      const myChoice = Number(e.currentTarget.dataset.value);
      const computerChoice = getComputerChoice($rpcImage.style.backgroundPosition);

      if(scoreCard.Victory.includes(myChoice - computerChoice)){
        score++;
        $msg.textContent = "승리"
      } else if (scoreCard.Destroy.includes(myChoice - computerChoice)){
        score--;
        $msg.textContent = "패배"
      } else if (scoreCard.Draw.includes(myChoice - computerChoice)){
        $msg.textContent = "무승부"
      }

      state = FLAG.STOP;
      $score.textContent = score;
    });
  }
}

// 이미지출력위치값으로 선택한거 찾아서 반환
function getComputerChoice(choice) {
  let temp = (choice.split(" ")[0]);
  temp = Number(temp.slice(0, temp.indexOf("px")));
  temp = temp / IMAGE_INTERVAL;

  return temp
}

// 게임시작 및 재개
function start() {
  $msg.textContent = "";
  state = FLAG.PLAYING;

  intervalTimerId = setInterval(() => {
    switch (getComputerChoice($rpcImage.style.backgroundPosition)) {
      case RPC.ROCK:
        $rpcImage.style.backgroundPosition = `${RPC.PAPER * IMAGE_INTERVAL}px 0px`
        break;
      case RPC.PAPER:
        $rpcImage.style.backgroundPosition = `${RPC.SCISSORS * IMAGE_INTERVAL}px 0px`
        break;
      case RPC.SCISSORS:
        $rpcImage.style.backgroundPosition = `${RPC.ROCK * IMAGE_INTERVAL}px 0px`
        break;
    
      default:
        alert("존재하지않은 오류");
        break;
    }
  }, mixInterval);
}