import React from "react";
import "../css/responseCheck.css";

export default function ResponseCheck(props) {
  const [state, setState] = React.useState("ready");                      // 현재상태
  const [message, setMessage] = React.useState("시작하려면 클릭해주세요");  // 메시지
  const [record, setRecord] = React.useState([]);   // 결과배열
  const [result, setResult] = React.useState("");   // 결과텍스트
  const timerId = React.useRef(-1);                 // 타이머아이디
  const startTime = React.useRef();                 // 시작시간

  // 초기화
  const init = () => {
    setState("ready");
    setMessage("시작하려면 클릭해주세요");
    timerId.current = -1;
  }

  const onClick = () => {
    switch (state) {
      case "ready":
        setState("waiting");
        setMessage("초록색이 되면 클릭해주세요")
        timerId.current = setTimeout(() => {
          setState("starting");
          setMessage("지금! 클릭해주세요")
          startTime.current = new Date();
        }, Math.random() * 2000 + 1000);
        break;
      
      case "waiting":
        setState("ready");
        setMessage("너무 성급하게 클릭하셨네요")
        clearTimeout(timerId.current);
        break;
      case "starting":
        setState("ready");
        setMessage("시작하려면 클릭해주세요");
        setResult(new Date() - startTime.current)
        setRecord(prev => [...prev, new Date() - startTime.current]);
        break;
    }
  }

  return (
    <>
      <section id="square" className={state} onClick={onClick}>
        <p className="message">{message}</p>
      </section>
      <h1>현재속도 : {result}ms</h1>
      <h1>평균속도 : {record.length && (record.reduce((pv, cv) => pv + cv) / record.length)}ms</h1>
    </>
  )
}