import React from "react";

import NumberBaseballTitle from "../components/NumberBaseballTitle.jsx";
import NumberBaseballForm from "../components/NumberBaseballForm.jsx";
import NumberBaseballProcess from "../components/NumberBaseballProcess.jsx";

export default function NumberBaseball(props) {
  const [title, setTitle] = React.useState("답을 입력하세요");
  const [chance, setChance] = React.useState(10);
  const [answer, setAnswer] = React.useState(getNumber());
  const [input, setInput] = React.useState("");
  const [recordList, setRecordList] = React.useState([]);
  const inputRef = React.useRef();

  const init = () => {
    setTitle("[다시시작] 답을 입력하세요");
    setChance(10);
    setAnswer(getNumber());
    setInput("");
    setRecordList([]);
  }

  const onChange = e => {
    setInput(e.target.value);
  }
  const onSubmit = e => {
    e.preventDefault();

    let strike = 0;
    let ball = 0;

    // 답체크
    answer.forEach((v, i) => {
      input.split("").forEach((value, index) => {
        // 값이같고
        if (+value === v) {
          if (i === index) {
            strike++;   // 같은인덱스면
          } else {
            ball++;     // 다른인덱스면
          }
        }
      });
    });

    // 기록 ( 불변성 => 기존 배열을 변경하지않고 새로운 배열을 만들어서 넣음 )
    setRecordList(prevRecord => [...prevRecord, `${input}: ${strike}스트라이크 ${ball}볼`]);

    // 볼 스트라이크 알려주기
    setTitle(`${strike}스트라이크 ${ball}볼`);

    // input에 포커스 및 비우기
    inputRef.current.focus();
    setInput("");

    // 정답
    if (strike === 4) {
      alert(`정답입니다. 게임을 다시시작합니다.`);
      return init();
    }

    // 기회 -1
    setChance(prev => prev - 1)

    // 게임종료
    if (chance === 0) {
      alert(`실패하셨습니다. 정답은 ${answer}입니다. 게임을 다시시작합니다.`);
      init();
    }
  }

  return (
    <>
      <h1>[정답 미리보기] {answer}</h1>
      <NumberBaseballTitle title={title} chance={chance} />
      <NumberBaseballForm input={input} inputRef={inputRef} onChange={onChange} onSubmit={onSubmit} />
      <NumberBaseballProcess recordList={recordList} />
    </>
  )
}

function getNumber(){
  const candidate = Array(9).fill().map((v, i) => i + 1);
  let index = -1;
  const selection = [];

  for (let i = 0; i < 4; i++){
    index = Math.floor(Math.random() * candidate.length);
    selection.push(candidate[index]);
    candidate.splice(index, 1);
  }

  return selection;
}