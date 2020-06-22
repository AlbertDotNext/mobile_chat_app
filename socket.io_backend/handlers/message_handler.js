function handleMessage() {
  socket.on('message', (messageText) => {
    const userId = userIds[socket.id];
    const message = createMessage(userId, messageText);
    console.log(message);
    socket.broadcast.emit('message', message);
  });
}
