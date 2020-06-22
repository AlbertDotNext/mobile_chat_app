// const express = require('express');
const io = require('socket.io')();

let currentUserId = 2;
let currentMessageId = 1;
const userIds = {};

function createMessage(userId, messageText) {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: userId,
      name: 'Test User',
      avatar:
        'https://pic2.cwuzx.com/e1e1cbefbffab1ee214ee9e98da2672748115d11-800.jpg',
    },
  };
}

io.on('connection', (socket) => {
  console.log('a user connected!');
  console.log(socket.id);
  userIds[socket.id] = currentUserId++;
});

const PORT = process.env.PORT || 3001;
io.listen(PORT);
