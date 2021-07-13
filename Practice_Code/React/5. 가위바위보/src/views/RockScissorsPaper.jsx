import React from "react";

import RockScissorsPaperImage from "../components/RockScissorsPaperImage.jsx";
import ChoiceButtons from "../components/ChoiceButtons.jsx";
import RockScissorsPaperResult from "../components/RockScissorsPaperResult.jsx";

export default function RockScissorsPaper(props) {
  const [position, setPosition] = React.useState(-0);
  const [resultText, setResultText] = React.useState("");
  const [score, setScore] = React.useState(0);
  let timerId = React.useRef(null);
  const COORD = React.useMemo(
    () => ({
      ROCK: -0,
      SCISSORS: -142,
      PAPER: -284,
    }),
    [],
  );

  React.useEffect(() => {
    timerId.current = setInterval(changeHand, 100);

    return () => {
      clearInterval(timerId.current);
    };
  }, [COORD]);

  // 가위, 바위, 보 버튼 클릭
  const onSelect = e => {
    let myRsp = null;
    let computerRsp = null;

    // 내꺼 값으로 치환
    switch (e.target.name) {
      case "ROCK":
        myRsp = 0;
        break;
      case "SCISSORS":
        myRsp = -1;
        break;
      case "PAPER":
        myRsp = +1;
        break;
    }

    // 컴퓨터꺼 값으로 치환
    switch (position) {
      case COORD.ROCK:
        computerRsp = 0;
        break;

      case COORD.SCISSORS:
        computerRsp = -1;
        break;

      case COORD.PAPER:
        computerRsp = +1;
        break;
    }

    // 승패계산
    switch (myRsp - computerRsp) {
      case 0:
        setResultText("무승부");
        break;
      case 1:
      case -2:
        setResultText("승리");
        setScore(prev => prev + 1);
        break;
      case -1:
      case 2:
        setResultText("패배");
        setScore(prev => prev - 1);
        break;
    }

    // 잠시 중단 후 1초뒤 실행
    clearInterval(timerId.current);
    setTimeout(() => {
      timerId.current = setInterval(changeHand, 100);
    }, 1000);
  };

  const changeHand = () => {
    // 이미지 하나의 영역당 크기가 142px임
    // ROCK -> SCISSORS -> PAPER -> ROCK 순으로 진행됨
    setPosition(prev => (prev === COORD.PAPER ? COORD.ROCK : prev - 142));
  };

  return (
    <>
      <RockScissorsPaperImage position={position}></RockScissorsPaperImage>
      <ChoiceButtons onSelect={onSelect}></ChoiceButtons>
      <RockScissorsPaperResult resultText={resultText} score={score}></RockScissorsPaperResult>
    </>
  );
}
