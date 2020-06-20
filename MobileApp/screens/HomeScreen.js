import React, { useEffect. useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import io from 'socket.io-client';

export default function HomeScreen() {
  const [messageToSend, setMessageToSend] = useState('');
  useEffect(() => {
    io('http://192.168.1.5:3001');
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextInput placeholder="Enter chat message..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
