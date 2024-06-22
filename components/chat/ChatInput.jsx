import { View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  return (
    // View with the same height as the input below it, preventing messages from being hidden
    <View className="h-16">
      <View className="absolute bottom-0 w-full" behavior="position" >
        <View className="flex-row items-center justify-between bg-darkWhite p-3">
          <TextInput
            placeholder="Type a message..."
            className="flex-1 w-10/12 bg-gray-200 rounded-full p-2 br-10 mr-3"
            onChangeText={(value) => setMessage(value)}
          />
          <TouchableOpacity onPress={() => console.log(message)}>
            <FontAwesome name="send" size={24} color="#22c55e" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ChatInput;