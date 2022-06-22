import React from 'react';
import { createContext, useState } from 'react';
import { complaint, createChatRoom, getChat, sendMessage } from '../services/chat';
// import { io } from "socket.io-client";
import { baseURL } from '../lib/axios';

const socketURL = `${baseURL}/socket.io/`

export const ChatRoomContext = createContext();

const initializeChatRoom = {
    chatRoomId: '',
    chatRoomUser: { name: '', avatar: '' },
    chatItems: [],
    socket: null
}

export const ChatRoomProvider = ({ children }) => {
    const [chatRoom, setChatRoom] = useState(initializeChatRoom);
    const getChatMessages = async (chatRoomId) => {
        try {
            const response = await getChat(chatRoomId);
            const { conversation } = response;
            const chatItems = conversation.map((chatItem, index) => {
                const { message } = chatItem;
                return {
                    key: index,
                    msg: message.messageText,
                }
            })
            return chatItems;
        } catch (error) {
            throw new Error(error);
        }
    }
    const create = async (userIds, profileData) => {
        try {
            const response = await createChatRoom(userIds);
            const { chatRoomId } = response.chatRoom;
            return { chatRoomId, chatRoomUser: profileData }
        } catch (error) {
            throw new Error(error);
        }
    };
    const initChatRoom = async (userIds, profileData) => {
        try {
            const chatRoomCredential = await create(userIds, profileData);
            const chatItems = await getChatMessages(chatRoomCredential.chatRoomId);
            // const socket = io(`${socketURL}?roomId=${chatRoomCredential.chatRoomId}`)
            setChatRoom({ ...chatRoomCredential, chatItems})
        } catch (error) {
            throw new Error(error);
        }
    }
    const postChatMessage = async (chatRoomId, message) => {
        try {
            await sendMessage(chatRoomId, message);
            return

        } catch (error) {
            throw new Error(error);
        }
    }

    const submitComplaint = async (complaintBody) =>{
        try {
            await complaint(complaintBody);
            return;
        } catch (error) {
            throw new Error(error)
        }
    }

    /*const emitMessage = (message) =>{
        if(chatRoom.socket){
            chatRoom.socket.emit("chat message", message)
        }
    }*/
    return <ChatRoomContext.Provider value={{ chatRoom, initChatRoom, create, postChatMessage, submitComplaint }}>{children}</ChatRoomContext.Provider>;
}