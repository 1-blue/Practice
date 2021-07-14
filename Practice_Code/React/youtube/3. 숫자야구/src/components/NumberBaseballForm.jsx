import React from "react";

export default function NumberBaseballForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input type="text" maxLength="4" ref={props.inputRef} value={props.input} onChange={props.onChange} />
      <button type="submit">제출</button>
    </form>
  )
}