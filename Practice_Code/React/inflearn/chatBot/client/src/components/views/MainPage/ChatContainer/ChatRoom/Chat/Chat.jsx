import React from "react";

import "./Chat.css";

function Chat({ chat }) {
  const distincChat = () => {
    switch (chat.who) {
      // 로봇
      case 0:
        return <li className="chat robot__chat">{chat.contents}</li>;

      // 사람
      case 1:
        return <li className="chat my__chat">{chat.contents}</li>;

      default:
        break;
    }
  };

  return distincChat();
}

export default Chat;
