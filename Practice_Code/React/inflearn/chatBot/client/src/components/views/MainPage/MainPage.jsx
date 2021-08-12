import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

// css
import "./MainPage.css";

import { apiDialogflowEvent, apiDialogflowText } from "@/api";

import ChatForm from "./ChatForm/ChatForm";
import ChatRoom from "./ChatRoom/ChatRoom";

function MainPage() {
  const [initMessage, setInitMessage] = useState(null);
  const [myMessage, setMyMessage] = useState("");
  const [robotMessage, setRobotMessage] = useState("");
  const [chattingList, setChattingList] = useState([]);

  // 0 로봇꺼, 1 내꺼

  // 입장시 전달할 메시지 받기
  useEffect(async () => {
    const response = await apiDialogflowEvent({ event: "WelcomToMyWebSite" });
    setInitMessage(response.fulfillmentText);
    setChattingList(prev => [...prev, { who: 0, contents: response.fulfillmentText }]);
  }, []);

  // 채팅입력시 메시지 받기
  const onChange = async e => {
    setMyMessage(e.target.value);
  };

  // 채팅봇에게 질문전달
  const onSubmit = async e => {
    e.preventDefault();

    // 내채팅기록
    setChattingList(prev => [...prev, { who: 1, contents: myMessage }]);
    setMyMessage("");

    // 로봇의 답변 기록
    const response = await apiDialogflowText({ text: myMessage });
    setRobotMessage(response.fulfillmentText);
    setChattingList(prev => [
      ...prev,
      { who: 0, contents: response.fulfillmentText === "" ? "잘모르겠어요..." : response.fulfillmentText },
    ]);

    console.log(robotMessage);
  };

  return (
    <section className="main__page">
      <h1 className="main__page__title">
        <span>채팅봇</span>
        <i className="fas fa-robot" />
      </h1>
      {initMessage && <ChatRoom chattingList={chattingList} />}
      {initMessage && <ChatForm onSubmit={onSubmit} onChange={onChange} myMessage={myMessage} />}
    </section>
  );
}

export default withRouter(MainPage);
