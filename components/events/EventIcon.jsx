import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'
import EventBG from "../../assets/images/pingpongbg.png"

const EventIcon = ({containerStyles}) => {
  return (
    
      <TouchableOpacity className={`h-[8vh] w-[25%] ${containerStyles} p-1`}>
        <Image
         source={EventBG}
         resizeMode="cover"
         className="h-full w-full rounded-lg"
        />
      </TouchableOpacity>
  )
}

export default EventIcon