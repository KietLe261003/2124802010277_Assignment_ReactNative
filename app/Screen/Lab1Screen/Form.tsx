import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';

export default function Form() {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What is your name?</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={name}
        onChangeText={setName}
      />
      <Button title="Say Hello" onPress={() => {
        alert(`Hello, ${name}!`);
        setName("");
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', fontSize: 18 },
  input: {
    marginTop: 10, backgroundColor: "rgba(0,0,0,0.1)",
    padding: 10, borderRadius: 5, marginBottom: 10
  }
});
