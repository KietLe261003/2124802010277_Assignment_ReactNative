import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { Dispatch } from "react";
interface InputTypeProps{
    content: string,
    setContent: Dispatch<React.SetStateAction<string>>; 
    placeholder?: string;
}
const InputText:React.FC<InputTypeProps> = ({content,setContent,placeholder=''}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={content}
      onChangeText={setContent}
      autoCapitalize="none"
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFD700", // Yellow background for inputs
  },
});
