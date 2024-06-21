import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from "@expo/vector-icons";

import ChatHeader from "../../components/chat/ChatHeader";

const aiChat = () => {
  return (
    <SafeAreaView className="h-full bg-black">
      <ChatHeader chatName="AI Chat" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5">
        <View className="flex-row items-center justify-center">
          <FontAwesome name="user-circle" size={30} color="black" />
          <Text style={styles.chatUsername} className="text-2xl font-semibold text-center ml-3">AI Assistant</Text>
        </View>
        
        <View className="mt-5 p-5">
          <View className="flex-row items-center justify-start mt-3">
            <View className="bg-lightGreen py-2 px-3 rounded-lg">
              <Text className="text-[#5e5e5e]">Hello, how can I help you today?</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-end mt-3">
            <View className="bg-primary py-2 px-3 rounded-lg">
              <Text className="text-white">Does Salesianum offer scholarships?</Text>
            </View>
          </View>
        </View>
        {/* Chat input, float to bottom */}
        <View className="flex-row items-center justify-between w-11/12 mx-auto mt-5">
          <View className="bg-lightGreen py-2 px-3 rounded-lg w-4/5 items-center justify-center">
            <TextInput placeholder="Type your message here" className="w-full" />
          </View>
          <TouchableOpacity className="bg-primary py-2 px-3 rounded-lg w-1/5 items-center justify-center">
            <FontAwesome name="paper-plane" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default aiChat

const styles = StyleSheet.create({})