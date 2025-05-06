import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
const Project = [
  { title: "Bottom", Screen: "BottomTab" },
  { title: "Drawer", Screen: "DrawerApp" },
  { title: "Stack", Screen: "StackApp" },
];
const Lab2Screen = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài thực hành 2</Text>
      <FlatList
        data={Project}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <Button
              title={item.title}
              onPress={() => {
                navigation.navigate(
                  "Lab2StackScreen" as never,
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

export default Lab2Screen;

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
