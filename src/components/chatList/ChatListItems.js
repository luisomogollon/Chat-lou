import React, { useContext } from "react";
import Avatar from "./Avatar";
import { ChatRoomContext } from "../../context";



function ChatListItems(props) {
  const { initChatRoom } = useContext(ChatRoomContext)
  async function handleSelectChat({ currentTarget }) {

    try {
      await initChatRoom([props.userId], { name: props.name, avatar: props.image })
    } catch (error) {
      throw new Error(error)
    }
    for (
      let index = 0;
      index < currentTarget.parentNode.children.length;
      index++
    ) {
      currentTarget.parentNode.children[index].classList.remove("active");
    }
    currentTarget.classList.add("active");
  };

  return (
    <div
      style={{ animationDelay: `0.${props.animationDelay}s` }}
      onClick={handleSelectChat}
      className={`chatlist__item ${props.active ? props.active : ""
        } `}
    >
      <Avatar
        isOnline={props.isOnline}
      />

      <div className="userMeta">
        <p>{props.name}</p>
        <span className="activeTime">Iniciar conversación</span>
      </div>
    </div>
  );

}

export default ChatListItems;