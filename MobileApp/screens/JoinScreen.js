import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';

export default function JoinScreen({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require('../assets/original.png')}
      />
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <TextInput
          onChangeText={(text) => setUsername(text)}
          value={username}
          style={{ fontSize: 30, textAlign: 'center' }}
          placeholder="Enter username"
        />
        <Button
          title="Join Chat"
          onPress={() => {
            dispatch({ type: 'server/join', data: username });
            navigation.navigate('App');
          }}
        />
      </View>
      <KeyboardAvoidingView behavior="padding" />
    </View>
  );
}
