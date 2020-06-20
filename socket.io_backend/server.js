// const express = require('express');
const io = require('socket.io')();

io.on('connection', () => {
  console.log('a user connected!');
});

const PORT = process.env.PORT || 3001;
io.listen(PORT, () => console.log(`Listening on ${PORT}`));
