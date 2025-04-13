import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Cat from '../Component/Cat'

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is my app</Text>
      <Cat name='Mun Mun'/>
    </View>
  )
}

export default App

const styles= StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 20,
        color: 'blue',
        fontWeight: 'bold'
    }
})