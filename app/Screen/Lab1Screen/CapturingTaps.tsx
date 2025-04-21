import React from 'react';
import { View, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function CapturingTaps() {
  return (
    <View style={styles.container}>
      <Button title="Press Me" onPress={() => Alert.alert("Hello")} />
      <TouchableOpacity
        onPress={() => Alert.alert("Hello 2!")}
        style={styles.customButton}
      >
        <Text style={styles.customButtonText}>Button 2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  customButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  customButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
