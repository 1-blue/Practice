import React from "react";

import WordRelayForm from "../components/WordRelayForm";

export default function WordRelay(props){
  const [word, setWord] = React.useState("");
  const [answer, setAnswer] = React.useState("선풍기");
  const wordRef = React.useRef();

  const onChange = e => {
    setWord(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();

    if (word[0] === answer[answer.length - 1]) {
      setAnswer(word);
      setWord("");
      wordRef.current.focus();
      return;
    }
    
    alert("오답입니다. 확인후 다시 입력해주세요");
  }

  return (
    <WordRelayForm word={word} answer={answer} wordRef={wordRef} onChange={onChange} onSubmit={onSubmit} />
  )

}