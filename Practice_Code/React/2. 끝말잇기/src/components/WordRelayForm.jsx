import React from "react";

export default function WordRelayForm(props){
  return (
    <form onSubmit={props.onSubmit}>
      <h1>{props.answer}</h1>
      <input type="text" ref={props.wordRef} value={props.word} onChange={props.onChange} />
      <button type="submit">제출</button>
    </form>
  )
}