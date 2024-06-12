import { View, Text, Image } from 'react-native'
import React from 'react'

const Member = ({ role, name, profileImg }) => {
  return (
    <View className="w-1/3 items-center p-1 pb-3">
        <Image
            source={profileImg}
            resizeMode='cover'
            className="h-[100px] w-full mb-2 rounded-lg"
        />
        <Text className="font-semibold mb-1">{role}</Text>
      <Text>{name}</Text>
    </View>
  )
}

export default Member