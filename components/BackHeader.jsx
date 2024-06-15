import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import logo from "../assets/images/logo.png"
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';

const BackHeader = ({containerStyles, title}) => {
  return (
    <View className={`flex-row justify-between items-center ${containerStyles}`}>
        {/* back button */}
        <TouchableOpacity
          className="bg-tertiary w-8 py-1 flex items-center rounded"
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-2xl text-white font-semibold">{title}</Text>

        <TouchableOpacity activeOpacity={0.8}>
          <Image source={logo} className="h-[4vh] w-[4vh]" />
        </TouchableOpacity>
      </View>
  )
}

export default BackHeader