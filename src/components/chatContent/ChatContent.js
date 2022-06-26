import React, { useContext } from "react";
import "./chatContent.css";
import ChatWindow from "./ChatWindow";
import { ChatRoomContext } from "../../context";



function ChatContent() {
  const { chatRoom, postChatMessage, deleteChat, deleteMessage } = useContext(ChatRoomContext);
  return (
    <div className="main__chatcontent">
      {chatRoom.chatRoomId ? <ChatWindow 
        deleteChat={deleteChat} 
        removeMsg={deleteMessage} 
        postMsg={postChatMessage} 
        {...chatRoom} />
        : <p className="placeholder_chat"> Elige un chat para comenzar.</p>}
    </div >
  );
}


export default ChatContent;
