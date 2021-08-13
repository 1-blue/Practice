import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { dialogflowEvent, dialogflowText, myText } from "@/store/actions/chatAction";

import "./ChatContainer.css";

import ChatForm from "./ChatForm/ChatForm";
import ChatRoom from "./ChatRoom/ChatRoom";

function ChatContainer() {
  const [myMessage, setMyMessage] = useState("");
  const dispatch = useDispatch();
  const chattingList = useSelector(state => state.chatReducer);

  // 0 로봇꺼, 1 내꺼

  // 입장시 전달할 메시지 받기
  useEffect(async () => {
    dispatch(dialogflowEvent({ event: "WelcomToMyWebSite" }, 0));
  }, []);

  // 채팅입력시 메시지 받기
  const onChange = async e => {
    setMyMessage(e.target.value);
  };

  // 채팅봇에게 질문전달
  const onSubmit = async e => {
    e.preventDefault();

    // 내채팅기록
    dispatch(myText(myMessage, 1));
    setMyMessage("");

    // 로봇의 답변 기록
    dispatch(dialogflowText({ text: myMessage }, 0));
  };

  return (
    <section className="chat__container">
      <ChatRoom chattingList={chattingList} />
      <ChatForm onSubmit={onSubmit} onChange={onChange} myMessage={myMessage} />
    </section>
  );
}

export default ChatContainer;
