const words = ['노드', '끝말잇기', '선풍기', '사과', '한국', '나이'];
let currentWord = words[Math.floor(Math.random() * words.length)];
const currentWordNode = document.querySelector(".currentWord");
const errorMsg = document.querySelector(".errorMsg");
const wordInput = document.querySelector(".wordInput");
const wordBtn = document.querySelector(".wordBtn");
let timerId = null;

currentWordNode.textContent = currentWord;

wordBtn.addEventListener("click", () => {
  excute();
  wordInput.focus();
});

wordInput.addEventListener("keydown", e => {
  clearTimeout(timerId);
  errorMsg.textContent = "";
  if(e.key !== "Enter"){
    return;
  }
  excute();
});

function excute() {
  if(wordInput.value.length === 1){
    errorMsg.textContent = `두글자 이상 입력해주세요. (${wordInput.value})`;
    wordInput.value = "";
    timerId = setTimeout(() => {
      errorMsg.textContent = "";
    }, 3000);
  }
  else if(wordInput.value[0] === currentWord[currentWord.length - 1]){
    currentWord = wordInput.value;
    currentWordNode.textContent = currentWord;
    wordInput.value = "";
  } else {
    errorMsg.textContent = `일치하지 않은 단어를 입력하셨습니다. (${wordInput.value})`;
    wordInput.value = "";
    timerId = setTimeout(() => {
      errorMsg.textContent = "";
    }, 3000);
  }
}