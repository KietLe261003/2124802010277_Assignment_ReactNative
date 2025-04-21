import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent, ViewStyle } from 'react-native';


type CustomButtonProps = {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: ViewStyle;
};

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPress, buttonStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default function CustomButtonScreen() {
  return (
    <View style={styles.container}>
      <CustomButton
        text="Say Hello!"
        onPress={() => alert("Say Hello!")}
        buttonStyle={{ backgroundColor: '#f9c2ff' }}
      />
      <CustomButton
        text="Say GoodBye!"
        onPress={() => alert("Say GoodBye!")}
        buttonStyle={{ backgroundColor: 'red' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'skyblue',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
