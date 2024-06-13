import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import logo from "../assets/images/logo.png"
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';

const BackHeader = ({containerStyles}) => {
  return (
    <View className={`flex-row items-center justify-between ${containerStyles}`}>
            <TouchableOpacity
              className="bg-tertiary w-8 py-1 flex items-center rounded"
              activeOpacity={0.8}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={logo}
                  className="h-[4vh] w-[4vh]"
                />
            </TouchableOpacity>
          </View>
  )
}

export default BackHeader