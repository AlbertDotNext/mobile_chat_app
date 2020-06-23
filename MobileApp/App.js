console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import React from 'react';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';

const socket = io('http://192.168.1.5:3001');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

function reducer(state = {}, action) {
  switch (action.type) {
    case 'users_online':
      return { ...state, usersOnline: action.data };
    case 'private_message':
      const conversationId = action.data.conversationId;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [
              action.data.message,
              ...state.conversations[conversationId].messages,
            ],
          },
        },
      };
    case 'self_user':
      return { ...state, selfUser: action.data };
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log('new state', store.getState());
});

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
