import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from '@/app/Context/AuthContext'
import Lab4StackScreen from './Lab4Screen'

const Lab4 = () => {
  return (
    <AuthProvider>
        <Lab4StackScreen/>
    </AuthProvider>
  )
}

export default Lab4