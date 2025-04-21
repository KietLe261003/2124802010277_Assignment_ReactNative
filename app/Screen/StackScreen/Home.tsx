import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing';
import { useNavigation } from 'expo-router';
const data = [
  { id: '1', title: 'Lab 1', Screen: 'Lab1' },
];
const Home = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <Button title={item.title} onPress={()=>{navigation.navigate(item.Screen)}} />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    marginVertical: 5,
  },
  separator: {
    height: 10,
  },
});