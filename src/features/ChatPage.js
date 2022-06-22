import React from 'react';
import ChatBody from "../components/chatBody/ChatBody";
import Nav from "../components/nav/Nav";
import { ChatRoomProvider } from '../context';
import storage from '../utils/storage';

export const ChatPage = () => {

    if (!storage.getToken()) {
        return null;
    }

    return (
        <ChatRoomProvider>
            <Nav />
            <ChatBody />
        </ChatRoomProvider>
       
    )
}

