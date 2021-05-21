const $firstNumber = document.querySelector(".first__number");
const $operator = document.querySelector(".operator");
const $lastNumber = document.querySelector(".last__number");
const $btn = document.querySelector(".btn");
const $result = document.querySelector(".result");

$btn.addEventListener('click', () => {
  if(!$firstNumber.value || !$lastNumber.value || !$operator.value){
    alert("숫자와 연산자를 입력해주세요");
    return;
  }

  switch ($operator.value) {
    case "+":
      $result.textContent = +$firstNumber.value + +$lastNumber.value
      break;
    case "-":
      $result.textContent = +$firstNumber.value - +$lastNumber.value
      break;
    case "*":
      $result.textContent = +$firstNumber.value * +$lastNumber.value
      break;
    case "/":
      $result.textContent = +$firstNumber.value / +$lastNumber.value
      break;
  
    default:
      $result.textContent = "정상적인 연산자를 입력해주세요."
      break;
  }
})

