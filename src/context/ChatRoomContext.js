import React from 'react';
import { createContext, useState } from 'react';
import { complaint, createChatRoom, getChat, sendMessage, deleteMsg, deleteRoom } from '../services/chat';

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
                const { _id, message, postedByUser, createdAt } = chatItem;
                const { firstName, lastName } = postedByUser[0];
                return {
                    id: _id,
                    key: index,
                    msg: message.messageText,
                    postedBy: `${firstName} ${lastName}`,
                    createdAt
                }
            })
            return chatItems;
        } catch (error) {
            throw new Error(error);
        }
    };

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
            setChatRoom({ ...chatRoomCredential, chatItems })
        } catch (error) {
            throw new Error(error);
        }
    };

    const postChatMessage = async (chatRoomId, message) => {
        try {
            await sendMessage(chatRoomId, message);
            const getNewerMessages = await getChatMessages(chatRoomId);
            setChatRoom(prev => ({ ...prev, chatItems: getNewerMessages }))
            return
        } catch (error) {
            throw new Error(error);
        }
    };

    const submitComplaint = async (complaintBody) => {
        try {
            await complaint(complaintBody);
            return;
        } catch (error) {
            throw new Error(error)
        }
    };

    const deleteChat = async () => {
        const chatRoomId = chatRoom.chatRoomId;
        try {
            await deleteRoom(chatRoomId);
            setChatRoom(initializeChatRoom);
            return;
        } catch (error) {
            throw new Error(error);
        }
    }

    const deleteMessage = async (targetId) => {
        await deleteMsg(targetId);
        const getUpdatedChat = await getChatMessages(chatRoom.chatRoomId);
        setChatRoom(prev => ({ ...prev, chatItems: getUpdatedChat }))
        return
    }

    return <ChatRoomContext.Provider
        value={{
            chatRoom,
            initChatRoom,
            create,
            postChatMessage,
            submitComplaint,
            deleteChat,
            deleteMessage
        }}>
        {children}
    </ChatRoomContext.Provider>;
}