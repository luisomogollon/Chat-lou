import axios from "../lib/axios";

const CONSUMER_TO_CONSUMER= "consumer-to-consumer"

export const createChatRoom = (userIds) => {
    return axios.post('/room/initiate',{userIds, type: CONSUMER_TO_CONSUMER });
};

/*
    {
        "success": true,
        "chatRoom": {
            "isNew": true,
            "message": "creating a new chatroom",
            "chatRoomId": "dd35bf837f2c433ebfff33a365f44b78",
            "type": "consumer-to-consumer"
        }
    }
*/
export const getChat = (chatRoomId) => {
 return axios.get(`/room/${chatRoomId}?limit=5&page=0`) 
};

export const sendMessage = (chatRoomId,messageText) => {
    return axios.post(`room/${chatRoomId}/message`,{messageText})
};

export const complaint = (body) => {
    return axios.post("/complaints",body);
};

export const deleteMsg = (targetId) => {
    return axios.delete(`/delete/message/${targetId}`);
}

export const deleteRoom = (targetRoomId) => {
    return axios.delete(`/delete/room/${targetRoomId}`);
}