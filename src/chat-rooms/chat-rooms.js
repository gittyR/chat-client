import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import './chat-rooms.css'

// const socket = io("ws://localhost:3000")

function ChatRooms() {
  const [allRooms, setAllRoom] = useState([]);
  const ENDPOINT = "http://localhost:3001";
  let socket = io(ENDPOINT);

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    fetch(`http://localhost:3001/get-rooms-by-userId?userId=${userId}`)
    .then(response => response.json())
    .then(res => {
        if (res && res.data) {
            setAllRoom(res.data)
        }
    })
  });

  function handleChange(roomName) {
    socket.emit('join-room', { username: 'gitty', room: roomName} )
    socket.on('join-room', (arg) => console.log(arg))
    
}

  return <div className="chat-room">
      <div className="label">Chat Rooms</div>
      {allRooms.map((room, index) =>
          <div className="item" key={index} onClick={()=>handleChange(room.name)}>{room.name}</div>
      )}
  </div>;

};
export default ChatRooms;