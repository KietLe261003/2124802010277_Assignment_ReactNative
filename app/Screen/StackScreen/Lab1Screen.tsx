import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
const Project = [
  { title: "Project 1", Screen: "HelloWorld" },
  { title: "Project 2", Screen: "CapturingTaps" },
  { title: "Project 3", Screen: "CustomButton" },
  { title: "Project 4", Screen: "StateAndProps" },
  { title: "Project 5", Screen: "Styling" },
  { title: "Project 6", Screen: "ScrollableContent" },
  { title: "Project 7", Screen: "Form" },
  { title: "Project 8", Screen: "LongList" },
  {title: "Project 9", Screen: "Calculator" },
];
const Lab1Screen = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài thực hành 1</Text>
      <FlatList
        data={Project}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <Button
              title={item.title}
              onPress={() => {
                navigation.navigate(
                  "Lab1StackScreen" as never,
                  { screen: item.Screen } as never
                );
              }}
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default Lab1Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 5,
  },
  separator: {
    height: 10,
  },
});
