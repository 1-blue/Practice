const $board = document.querySelector(".board");    // 화면용
const board = [];   // 데이터용
const $restartBtn = document.querySelector(".restart__btn");
const $computerBtn = document.querySelector(".computer__btn");
const $singleBtn = document.querySelector(".single__btn");
let $$ul = null;
let $$li = null;
let order = null;
let isGameOver = null;
const FLAG = {
  FIRST_PLAYER: "O",
  LAST_PLAYER: "X",
  SINGLE: 0,
  COMPUTER: 1,
}
let playState = null;

created();
init();

function created() {
  $restartBtn.addEventListener('click', init);
  $computerBtn.addEventListener('click', () => {
    playState = FLAG.COMPUTER;
  });
  $singleBtn.addEventListener('click', () => {
    playState = FLAG.SINGLE;
  });

  playState = FLAG.SINGLE;
}

function init() {
  // 데이터용 보드 초기화
  board.length = 0;

  // 데이터용 보드에 기본데이터 넣기
  for (let i = 0; i < 3; i++) {
    board.push([0, 0, 0]);
  }

  // 화면용 보드 초기화
  $board.innerHTML = "";

  // 화면용 보드에 기본데이터 넣기
  for (let row = 0; row < 3; row++) {
    $$ul = document.createElement("UL");

    for (let col = 0; col < 3; col++) {
      $$li = document.createElement("LI");
      $$li.setAttribute("data-row", row);     // 몇번째 보드인지 판단하기위해 "data-"값넣음
      $$li.setAttribute("data-col", col);
      $$ul.appendChild($$li);
    }

    $board.appendChild($$ul);
  }

  // 순서초기화... ( 선플레이어: true )
  order = true;

  // 게임끝인지 체크할 변수
  isGameOver = false;


  $board.addEventListener("click", boardClick);
}

// 보드판 클릭이벤트
function boardClick(e) {
  if(isGameOver){
    return;
  }

  // 이미 선택된 칸일 때
  if (e.target.textContent !== "") {
    alert("이미 선택된 칸입니다.");
    return;
  }

  // 선택한칸에 표시
  if (order) {
    e.target.textContent = FLAG.FIRST_PLAYER;
    board[+e.target.dataset.row][+e.target.dataset.col] = FLAG.FIRST_PLAYER;
  } else {
    e.target.textContent = FLAG.LAST_PLAYER;
    board[+e.target.dataset.row][+e.target.dataset.col] = FLAG.LAST_PLAYER;
  }

  playCheck(e.target.dataset);

  if(playState === FLAG.COMPUTER){
    computerPlay();
  }
}

// 컴퓨터차례
function computerPlay() {
  // 선택되지않은것만 골라서 배열로 변환후 랜던한 인덱스에 컴퓨터의 수를 놓기
  const $ulArray = Array.from($board.children).map(v => v.children);
  const $liArray = $ulArray.map(v => Array.from(v));
  const arr = $liArray.flat().filter(v => !v.textContent);
  const randomIndex = Math.floor(Math.random() * arr.length);
  arr[randomIndex].textContent = FLAG.LAST_PLAYER;
  board[arr[randomIndex].dataset.row][arr[randomIndex].dataset.col] = FLAG.LAST_PLAYER;

  playCheck(arr[randomIndex].dataset);
}

// 게임종료판단, 무승부판단, 플레이어변경
function playCheck(dataset) {
  // 게임종료여부판단
  if (checkWinner(dataset)) {
    alert(`${order ? FLAG.FIRST_PLAYER : FLAG.LAST_PLAYER}플레이어님이 승리하셨습니다.`);
    isGameOver = true;
    return;
  }

  // 무승부판단
  if(board.flat().every(v => v)){
    alert(`무승부입니다.`);
    isGameOver = true;
    return;
  }

  // 순서교체
  order = !order;
}

// 승자 체크
function checkWinner(dataset) {
  const row = dataset.row;
  const col = dataset.col;
  const player = order ? FLAG.FIRST_PLAYER : FLAG.LAST_PLAYER;

  let winner = false;

  // row체크
  if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
    winner = true;
  }

  // col체크
  if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
    winner = true;
  }

  // 대각선체크 ( \ )
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    winner = true;
  }

  // 대각선체크 ( / )
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    winner = true;
  }

  return winner;
}