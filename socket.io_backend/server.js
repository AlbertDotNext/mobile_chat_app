// const express = require('express');
const io = require('socket.io')();
const messageHandler = require('./handlers/message_handler');
const { v1: uuidv1 } = require('uuid');

const users = {};

function createdUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `http://placeimg.com/${rand1}/${rand2}/any`;
}

function createUsersOnline() {
  const values = Object.values(users);
  const onlyWithUsernames = values.filter((u) => u.username !== undefined);
  return onlyWithUsernames;
}

io.on('connection', (socket) => {
  console.log('a user connected!');
  console.log(socket.id);
  users[socket.id] = { userId: uuidv1() };

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('action', { type: 'users_online', data: createUsersOnline() });
  });
  socket.on('action', (action) => {
    switch (action.type) {
      case 'server/join':
        console.log('Got join event', action.data);
        users[socket.id].username = action.data;
        users[socket.id].avatar = createdUserAvatarUrl();
        io.emit('action', { type: 'users_online', data: createUsersOnline() });
        socket.emit('action', { type: 'self_user', data: users[socket.id] });
        break;
      case 'server/private_message':
        const conversationId = action.data.conversationId;
        const from = users[socket.id].userId;
        const userValues = Object.values(users);
        const socketIds = Object.keys(users);
        for (let i = 0; i < userValues.length; i++) {
          if (userValues[i].userId === conversationId) {
            const socketId = socketIds[i];
            io.sockets.sockets[socketId].emit('action', {
              type: 'priveate_message',
              data: {
                ...action.data,
                conversationId: from,
              },
            });
            break;
          }
        }
        break;
    }
  });
});

const PORT = process.env.PORT || 3001;
io.listen(PORT);
