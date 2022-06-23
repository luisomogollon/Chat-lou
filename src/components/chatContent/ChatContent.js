import React, { useRef, useContext, useState } from "react";
import "./chatContent.css";
import Avatar from "../chatList/Avatar"
import { ChatRoomContext } from "../../context";
import ChatItem from "./ChatItem"


function ChatContent() {
  const [postMessage, setPostMessage] = useState('')
  const { chatRoom, postChatMessage } = useContext(ChatRoomContext)
  const messagesEndRef = useRef(null);
  const sendMessage = () => {
    postChatMessage(chatRoom.chatRoomId, postMessage)
  }

  const ChatRoomContainer = () => (<>
    <div className="content__header">
      <div className="blocks">
        <div className="current-chatting-user">
          <Avatar
            isOnline="active"
            image={chatRoom.chatRoomUser.avatar}
          />
          <p>{chatRoom.chatRoomUser.name}</p>
        </div>
      </div>
      <div className="blocks">
      </div>
    </div>
    <div className="content__body">
      <div className="chat__items">
        {chatRoom.chatItems.map((item, index) => {
          return (
            <ChatItem
              animationDelay={index + 2}
              key={item.key}
              msg={item.msg}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
    <div className="content__footer">
      <div className="sendNewMessage">
        <button className="addFiles">
          <i className="fa fa-plus"></i>
        </button>
        <input
          type="text"
          placeholder="Escribe"
          onChange={(e) => setPostMessage(e.target.value)}
          value={postMessage}
        />
        <button onClick={sendMessage} className="btnSendMsg" id="sendMsgBtn">
          <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </>);

  return (
    <div className="main__chatcontent">
      {chatRoom.chatRoomId ? <ChatRoomContainer /> : <p className="textchat"> Elige un chat Para comenzar</p>}
    </div>
    
  );
 
}


export default ChatContent;
