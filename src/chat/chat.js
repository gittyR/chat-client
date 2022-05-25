import React, { useEffect } from "react";
import ChatRooms from "../chat-rooms/chat-rooms";
import './chat.css'

// const socket = io("ws://localhost:3000")

function Chat() {
  useEffect(() => {
  });

  return <div className="chat">
    <ChatRooms></ChatRooms>
  </div>;

};
export default Chat;