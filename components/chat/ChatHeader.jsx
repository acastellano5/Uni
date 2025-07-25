import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ChatHeader = ({ title }) => {
  return (
    <View>
      <View className="flex-row justify-between w-11/12 mx-auto items-center">
        <TouchableOpacity
          className="bg-tertiary w-8 py-1 flex items-center rounded"
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-2xl font-semibold text-white mx-auto right-4">{title}</Text>
      </View>
    </View>
  )
}

export default ChatHeader;
