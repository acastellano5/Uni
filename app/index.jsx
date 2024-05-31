import { View, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome6 } from '@expo/vector-icons';
// import logo  from "../assets/images/logo.png"
import logo from "../assets/images/logo.png"

const Onboarding = () => {
  return (
    <SafeAreaView className="bg-black h-full">

      <View className="pl-9">
        <Text className="text-primary text-4xl font-bold">Uni</Text>
      </View>


      <View className="bg-white mt-5 h-full rounded-t-3xl">
        <View>
            <Image
              source={logo}
              resizeMode="contain"
              className="w-[130px] h-[84px]"
            />
        </View>


        <FontAwesome6 name="school" size={100} color="black" />
      </View>

    <StatusBar backgroundColor="#000" style="light"/>
    </SafeAreaView>
  )
}

export default Onboarding