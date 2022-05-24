import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import io from "socket.io-client";

// const socket = io("ws://localhost:3000")

function Chat() {
  const [room, setRoom] = useState("");
  const [allRooms, setAllRoom] = useState([]);

  const ENDPOINT = "http://localhost:3001";
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:3001/get-rooms')
    .then(response => response.json())
    .then(res => {
        if (res && res.data) {
            setAllRoom(res.data)
        }
    })
    let socket = io(ENDPOINT);
    socket.emit("room1", { username: 'gitty', room: 'room1' })
    socket.on("room1", (arg) => console.log(arg))
  });

  function handleChange(event) {
    setRoom(event.target.value);

}

  return <div>Chat
    <select name="room" id="room"
      value={room}
      onChange={handleChange}>{
        allRooms.map((room) =>
          <option key={room.id}>{room.name} </option>
        )
      }
    </select>
  </div>;

};
export default Chat;