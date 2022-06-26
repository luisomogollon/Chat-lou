import React from "react";

const ChatItem = ({ msg, postedBy, chatDate, remove }) => {
  const utcDate = new Date(chatDate).toUTCString()

  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item`}
    >

      <div className="chat__item__content">
        <button onClick={remove}>Borrar</button>
        <div className="chat__msg">{msg}</div>
        <br />
        <div className="chat__msg">{postedBy}</div>
        <div className="chat__msg">{utcDate}</div>
      </div>
    </div>
  );
}

export default ChatItem;
