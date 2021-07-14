import React from "react";

export default function Ball(props) {
  // 공색깔 지정
  function getBallColor() {
    switch (true) {
      case props.number < 10:
        return "yellow";
      case props.number < 20:
        return "blue";
      case props.number < 30:
        return "red";
      case props.number < 40:
        return "purple";
      case props.number < 50:
        return "green";
    }
  }

  // eslint-disable-next-line prettier/prettier
  return (
    <li className={`ball ${getBallColor()}`}>
      {props.number}
    </li>
  );
}
