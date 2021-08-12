import React from "react";

import "./ChatForm.css";

function ChatForm({ onSubmit, onChange, myMessage }) {
  return (
    <form onSubmit={onSubmit} className="chat__form">
      <input type="text" className="chat__input" onChange={onChange} value={myMessage} />
      <button type="button" className="chat__button">
        전송
      </button>
    </form>
  );
}

export default ChatForm;
