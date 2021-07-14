import React from "react";

export default function RockScissorsPaperResult(props) {
  return (
    <>
      <h1>{props.resultText}</h1>
      <p>현재점수 : {props.score}</p>
    </>
  );
}
