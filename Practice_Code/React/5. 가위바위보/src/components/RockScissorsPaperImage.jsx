import React from "react";
import "../css/RockScissorsPaper.css";

export default function RockScissorsPaperImage(props) {
  return (
    <>
      <div className="rpc__image" style={{ backgroundPositionX: `${props.position}px` }} />
    </>
  );
}
