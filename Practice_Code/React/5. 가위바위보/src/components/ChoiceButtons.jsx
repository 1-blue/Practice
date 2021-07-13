import React from "react";

export default function ChoiceButtons(props) {
  return (
    <>
      <div onClick={props.onSelect}>
        <button type="button" name="SCISSORS">
          가위
        </button>
        <button type="button" name="ROCK">
          바위
        </button>
        <button type="button" name="PAPER">
          보
        </button>
      </div>
    </>
  );
}
