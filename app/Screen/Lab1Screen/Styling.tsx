import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

const Square = ({ text, bgColor }:{text:string; bgColor:string}) => (
  <View style={[styles.box, { backgroundColor: bgColor }]}>
    <Text>{text}</Text>
  </View>
);

export default function Styling() {
  return (
    <View style={styles.container}>
      <Square text="Square 1" bgColor="#7ce0f9" />
      <Square text="Square 2" bgColor="#4dc2c2" />
      <Square text="Square 3" bgColor="#ff637c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
  },
  box: {
    width: 100, height: 100, justifyContent: 'center', alignItems: 'center'
  }
});
