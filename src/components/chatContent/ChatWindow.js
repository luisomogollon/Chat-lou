/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from "react";
import Avatar from "../chatList/Avatar"
import ChatItem from "./ChatItem"


const ChatWindow = ({ removeMsg, postMsg, deleteChat, chatRoomId, chatItems, chatRoomUser }) => {
    const [postMessage, setPostMessage] = useState('')

    const remove = (id) => () => removeMsg(id)
    const sendMessage = () => {
        if (postMessage) {
            postMsg(chatRoomId, postMessage);
            setPostMessage('');
        }
    }

    useEffect(() => {
        function activateFeatureListener(event) {
            const { keyCode } = event;
            if (keyCode === 13) {
                sendMessage();
            }
        }
        document.addEventListener('keydown', activateFeatureListener);
        // Listener shouldnt remain if component is unmounted.
        return function cleanup() {
            document.removeEventListener('keydown', activateFeatureListener);
        };
    });

    const ChatRoomContainer = useMemo(() => (<>
        <div className="content__body">
            <div className="chat__items">
                {chatItems.map((item, index) => {
                    return (
                        <ChatItem
                            animationDelay={index + 2}
                            key={item.key}
                            msg={item.msg}
                            postedBy={item.postedBy}
                            chatDate={item.createdAt}
                            remove={remove(item.id)}
                        />
                    );
                })}
            </div>
        </div>
    </>), [chatItems]);


    return (
        <>
            <div className="content__header">
                <div className="blocks">
                    <div className="current-chatting-user">
                        <Avatar
                            isOnline="active"
                            image={chatRoomUser.avatar}
                        />
                        <p>{chatRoomUser.name}</p>
                    </div>
                </div>
                <div className="blocks">
                </div>
            </div>
            {ChatRoomContainer}
            <div className="content__footer">
                <div className="sendNewMessage">
                    <button onClick={deleteChat}>Borrar</button>
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
        </>
    )
}


export default ChatWindow