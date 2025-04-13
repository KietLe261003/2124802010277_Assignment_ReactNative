import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
interface CatProps{
    name: string
}
const Cat:React.FC<CatProps> = ({name}) => {
    const [isHungry,setIsHungry]=useState(true);
  return (
    <View>
      <Text>I am {name}, and I am {isHungry ? 'Hungry' : 'full'}</Text>
      <Button onPress={()=>setIsHungry(false)} disabled={!isHungry} title={isHungry ? 'Pour me some milk, please' : 'Thanh you!'}/>
    </View>
  )
}

export default Cat