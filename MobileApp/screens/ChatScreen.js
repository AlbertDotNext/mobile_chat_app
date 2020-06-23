import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { useHeaderHeight } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

ChatScreen.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam('name'),
});

export default function ChatScreen({ navigation }) {
  const dispatch = useDispatch();
  const selfUser = useSelector((state) => state.selfUser);
  const conversations = useSelector((state) => state.conversations);
  const userId = navigation.getParam('userId');
  const messages = conversations[userId].messages;
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={messages}
        onSend={(messages) => {
          dispatch({
            type: 'private_message',
            data: { message: messages[0], conversationId: userId },
          });
          dispatch({
            type: 'server/private_message',
            data: { message: messages[0], conversationId: userId },
          });
        }}
        user={{
          _id: selfUser,
        }}
      />

      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
