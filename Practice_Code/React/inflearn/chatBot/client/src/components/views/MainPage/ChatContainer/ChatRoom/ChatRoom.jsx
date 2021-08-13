import React from "react";

import "./ChatRoom.css";

import Chat from "./Chat/Chat";

function ChatRoom({ chattingList }) {
  return (
    <ul className="chat__room">
      {chattingList.map(chat => (
        <Chat key={chat.contents} chat={chat} />
      ))}
    </ul>
  );
}

export default ChatRoom;
