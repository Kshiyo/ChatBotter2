import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContextProvider.jsx';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function MessagePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [join, setJoin] = useState(false);
  const [joinedRoomCode, setJoinedRoomCode] = useState(null);

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const min = 100000;
    const max = 999999;
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    user.roomCode = randomCode;
    navigate('/chat');
  };

  const handleJoinRoomforDialogueBox = (e) => {
    e.preventDefault();
    setJoin(true);
  };

  const handleRoomCode = (e) => {
    setJoinedRoomCode(e.target.value);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    user.joinedRoomCode = joinedRoomCode;
    navigate('/chat');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md animate-appear">
        {!join ? (
          <div className="flex flex-col items-center animate-appear">
            <h1 className="text-3xl font-bold mb-6">Welcome to ChatApp</h1>
            <button
              onClick={handleJoinRoomforDialogueBox}
              className="bg-indigo-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-indigo-600 transition-colors duration-300 animate-appear"
            >
              Join Room
            </button>
            <button
              onClick={handleCreateRoom}
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300 animate-appear"
            >
              Create Room
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-appear">
            <h2 className="text-2xl font-bold mb-4 animate-appear">Join Room</h2>
            <input
              type="text"
              onChange={handleRoomCode}
              value={joinedRoomCode}
              placeholder="Enter Room Code"
              className="bg-gray-200 py-2 px-4 rounded-md mb-4 w-full animate-appear"
            />
            <button
              className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300 animate-appear"
              onClick={handleJoinRoom}
            >
              Join Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagePage;