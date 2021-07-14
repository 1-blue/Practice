import React, { useCallback, useMemo } from "react";

import "../css/lotto.css";

import Ball from "../components/Ball";

export default function Lotto(props) {
  // getNumbers()를 바로 사용할경우 getNumbers()가 계속 호출되므로
  // useMemo()를 이용해서 값을 캐싱해서 계속 호출되지않도록함
  const lottoNumbers = useMemo(() => getNumbers(), []);
  const [winNumbers, setWinNumbers] = React.useState(lottoNumbers);
  const [winBalls, setWinBalls] = React.useState([]);
  const timersId = React.useRef([]);

  React.useEffect(() => {
    winNumbers.forEach((number, index) => {
      const timerId = setTimeout(() => {
        setWinBalls(prev => [...prev, <Ball key={number} number={number}></Ball>]);
      }, (index + 1) * 1000);

      timersId.current.push(timerId);
    });

    return () => {
      timersId.current.forEach(timerId => clearTimeout(timerId));
      timersId.current = [];
    };
  }, [winNumbers]);

  const onRestart = useCallback(() => {
    setWinNumbers(getNumbers());
    setWinBalls([]);
  }, []);

  return (
    <>
      <h1>로또</h1>
      <ul className="balls">{winBalls}</ul>
      <button type="button" onClick={onRestart}>
        restart
      </button>
    </>
  );
}

// 랜덤한 숫자 7개 뽑기
function getNumbers() {
  // 후보
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);

  // 당첨숫자
  const winNumbers = [];
  // 인덱스
  let index = null;

  // 랜덤숫자 중복제외 7개 뽑기
  for (let i = 0; i < 7; i++) {
    index = Math.floor(Math.random() * candidate.length);
    winNumbers.push(candidate[index]);
    candidate.splice(index, 1);
  }

  return winNumbers;
}
