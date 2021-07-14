import React from "react";

export default function NumberBaseballProcess(props) {
  return (
    <ul>
      {props.recordList.map(v => <li key={v}>{v}</li>)}
    </ul>
  )
}