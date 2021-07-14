import React from "react";

export default function NumberBaseballTitle(props) {
  return (
    <>
      <h1>{props.title}</h1>
      <p>남은기회 {props.chance}</p>
    </>
  )
}