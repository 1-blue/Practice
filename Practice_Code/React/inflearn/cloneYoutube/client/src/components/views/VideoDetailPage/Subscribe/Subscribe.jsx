import React from "react";

function Subscribe({ isSubscribe, SubscribeNumber, onClickSubscribe }) {
  const rename = () => {
    if (isSubscribe) {
      return (
        <button type="button" className="subscribe__btn" style={{ background: "gray" }} onClick={onClickSubscribe}>
          {SubscribeNumber} 구독취소
        </button>
      );
    }

    return (
      <button type="button" className="subscribe__btn" onClick={onClickSubscribe}>
        {SubscribeNumber} 구독
      </button>
    );
  };

  return <>{rename()}</>;
}

export default Subscribe;
