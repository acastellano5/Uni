import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Member = ({ role, name, profileImg, uid }) => {
  return (
    <TouchableOpacity className="w-1/3 items-center p-1 pb-3" activeOpacity={0.8} onPress={() =>  router.push({
      pathname: '/profile/profileShow',
      params: { uid }
    })}>
        <Image
            source={profileImg}
            resizeMode='cover'
            className="h-[100px] w-full mb-2 rounded-lg"
        />
        <Text className="font-semibold mb-1">{role}</Text>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

export default Member