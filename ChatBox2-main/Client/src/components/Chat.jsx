import React, { useEffect, useState } from "react";
import { useAuth } from "../context/UserContextProvider";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io('http://localhost:5000');

const Chat = () => {
  const navigate = useNavigate();
  const [userchat, setUserChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [creator, setCreator] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user.joinedRoomCode) {
      const roomCode = user.joinedRoomCode;
      socket.emit('joinRoom', roomCode);
    }

    if (user.roomCode) {
      setCreator(true);
      const roomCode = user.roomCode;
      socket.emit('createRoom', roomCode);
    }

    const handleMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    };
  }, [user, setCreator, setMessages, socket]);

  const handleUserChat = (e) => {
    setUserChat(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const roomCode = user.roomCode || user.joinedRoomCode;
    socket.emit('chatMessage', { roomCode: roomCode, message: userchat });
    setUserChat("");
  };

  const handleLeave = (e) => {
    e.preventDefault();
    socket.emit('leaveRoom');
    creator ? (user.roomCode = "") : (user.joinedRoomCode = "");
    navigate("/message");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-indigo-900 to-purple-800">
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md animate-appear">
        <div className="font-bold text-indigo-800 animate-appear">
          Room Code: {creator ? user.roomCode : user.joinedRoomCode}
        </div>
        <div className="font-bold text-indigo-800 animate-appear">User Name: {user.userName}</div>
      </div>

      <div className="flex-grow overflow-y-auto px-8 py-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-4 rounded-lg ${
              creator
                ? "bg-indigo-200 text-indigo-800 self-end animate-slide-in-right"
                : "bg-purple-200 text-purple-800 self-start animate-slide-in-left"
            }`}
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="flex items-center px-8 py-4 bg-white shadow-md animate-appear">
        <input
          type="text"
          placeholder="Type your message..."
          value={userchat}
          onChange={handleUserChat}
          className="flex-grow px-4 py-2 rounded-l-lg bg-gray-200 text-gray-800 focus:outline-none animate-appear"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg animate-appear hover:bg-indigo-700 focus:outline-none transition duration-300 transform hover:scale-105"
        >
          Send
        </button>
        <button
          onClick={handleLeave}
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 animate-appear focus:outline-none transition duration-300 transform hover:scale-105"
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default Chat;