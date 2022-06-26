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
                    <button onClick={deleteChat}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" className="bi bi-eraser" viewBox="0 0 16 16">
                        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                    </svg></button>
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