// const express = require('express');
const io = require('socket.io')();
const messageHandler = require('./handlers/message_handler');
const uuidv1 = require('uuid/v1');

const users = {};

function createdUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `http://placeimg.com/${rand1}/${rand2}/any`;
}
io.on('connection', (socket) => {
  console.log('a user connected!');
  console.log(socket.id);
  users[socket.id] = { userId: uuidv1() };
  socket.on('join', (username) => {
    users[socket.id].username = username;
    users[socket.id].avatar = createdUserAvatarUrl();
    messageHandler.handleMessage(socket, users);
  });
  socket.on('action', (action) => {
    switch (action.type) {
      case 'server/hello':
        console.log('Got hello event', action.data);
        socket.emit('action', { type: 'message', data: 'Good day!' });
        break;
      case 'server/join':
        console.log('Got join event', action.data);
        users[socket.id].username = action.data;
        users[socket.id].avatar = createdUserAvatarUrl();
        const values = Object.values(users);
        const onlyWithUsernames = values.filter(
          (u) => u.username !== undefined
        );
        io.emit('action', { type: 'user_onlline', data: value });
        break;
    }
  });
});

const PORT = process.env.PORT || 3001;
io.listen(PORT);
