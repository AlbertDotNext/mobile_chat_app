import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

export default function HomeScreen() {
  const [recvMessages, setRecvMessages] = useState([]);
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io('http://192.168.1.5:3001');
    socket.current.on('message', (message) => {
      setRecvMessages((prevState) => GiftedChat.append(prevState, message));
    });
  }, []);

  const onSend = (messages) => {
    socket.current.emit('message', messages[0].text);
    setRecvMessages((prevState) => GiftedChat.append(prevState, messages));
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={recvMessages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
