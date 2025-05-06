import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HelloWorld() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  }
});
